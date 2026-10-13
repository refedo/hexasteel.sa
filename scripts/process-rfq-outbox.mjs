#!/usr/bin/env node
// Run as a dedicated scheduled DigitalOcean worker, NOT as a public HTTP endpoint.
// Example: once per minute via controlled scheduler. Requires independent Resend
// credentials and a database role authorised to claim/update rfq_outbox rows.
import pg from "pg";
import {randomUUID} from "node:crypto";
const mandatory=["RFQ_DATABASE_URL","RESEND_API_KEY","CONTACT_FROM_EMAIL"];
if(!mandatory.every(k=>process.env[k])){console.error("RFQ outbox worker configuration missing");process.exit(1);}
const db=new pg.Pool({
 connectionString:process.env.RFQ_DATABASE_URL,
 ssl:{rejectUnauthorized:true,...(process.env.RFQ_DATABASE_CA_PEM?{ca:process.env.RFQ_DATABASE_CA_PEM.replaceAll("\\n","\n")}: {})},
 max:2,connectionTimeoutMillis:6000,
});
async function claim(){
 const client=await db.connect();
 try{
  await client.query("BEGIN");
  const result=await client.query(`
   SELECT id,reference,kind,recipient,reply_to,subject,body,attempts
   FROM rfq_outbox
   WHERE (status='queued' AND next_attempt_at<=now())
      OR (status='sending' AND lease_until<now())
   ORDER BY id FOR UPDATE SKIP LOCKED LIMIT 1`);
  if(!result.rowCount){await client.query("COMMIT");return null;}
  const row=result.rows[0];
  const token=randomUUID();
  await client.query(`UPDATE rfq_outbox
   SET status='sending',attempts=attempts+1,claim_token=$2,
    lease_until=now()+interval '90 seconds',updated_at=now()
   WHERE id=$1`,[row.id,token]);
  await client.query("COMMIT");
  return {...row,token};
 }catch(err){await client.query("ROLLBACK").catch(()=>{});throw err;}finally{client.release();}
}
async function deliver(job){
 let accepted=false,messageId=null,error="delivery not accepted";
 try{
  const result=await fetch("https://api.resend.com/emails",{
   method:"POST",signal:AbortSignal.timeout(18000),
   headers:{
    "Content-Type":"application/json",Authorization:"Bearer "+process.env.RESEND_API_KEY,
    "Idempotency-Key":"hexa-"+job.reference+"-"+job.kind,
   },
   body:JSON.stringify({from:process.env.CONTACT_FROM_EMAIL,to:[job.recipient],reply_to:job.reply_to,
    subject:job.subject,text:job.body}),
  });
  accepted=result.ok;
  if(accepted){const payload=await result.json().catch(()=>null);messageId=typeof payload?.id==="string"?payload.id:null;}
  else error="provider HTTP "+result.status;
 }catch{error="provider request failed";}
 const tries=job.attempts+1;
 const delay=Math.min(3600,Math.pow(2,Math.min(tries,10))*30);
 await db.query(`UPDATE rfq_outbox
   SET status=$3,claim_token=null,lease_until=null,provider_message_id=$4,
   last_error=$5,next_attempt_at=now()+($6::int*interval '1 second'),updated_at=now()
   WHERE id=$1 AND claim_token=$2`,
  [job.id,job.token,accepted?"sent":tries>=10?"failed":"queued",
   messageId,accepted?null:error,accepted?0:delay]);
 console.log("RFQ notification",job.reference,job.kind,accepted?"accepted":"retry scheduled");
}
try{
 for(let n=0;n<50;n++){const job=await claim();if(!job)break;await deliver(job);}
}catch(err){console.error("RFQ worker infrastructure failure");process.exitCode=1;}finally{await db.end();}
