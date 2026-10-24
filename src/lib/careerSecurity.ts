import {createConnection} from 'node:net';
export function careersConfigured(){return process.env.CAREERS_SUBMISSIONS_ENABLED==='true'&&Boolean(process.env.CAREERS_TO_EMAIL&&process.env.CONTACT_RESEND_API_KEY&&process.env.CONTACT_RESEND_FROM_EMAIL&&process.env.CONTACT_TURNSTILE_SITE_KEY&&process.env.CONTACT_TURNSTILE_SECRET_KEY&&process.env.CAREERS_CLAMAV_SOCKET);}
/** Private local ClamAV INSTREAM. Never send a candidate CV to a public scanner. */
export function scanCareerPdf(bytes:Uint8Array):Promise<boolean>{
 return new Promise(resolve=>{
  const path=process.env.CAREERS_CLAMAV_SOCKET;if(!path){resolve(false);return;}
  const socket=createConnection({path});let answer='';let finished=false;
  function done(ok:boolean){if(finished)return;finished=true;socket.destroy();resolve(ok);}
  socket.setTimeout(15000,()=>done(false));socket.on('error',()=>done(false));
  socket.on('data',chunk=>{answer+=chunk.toString();if(answer.length>1024)return done(false);if(answer.includes('\0')||answer.includes('\n'))done(/^stream: OK[\0\n]/.test(answer));});
  socket.on('end',()=>done(/^stream: OK[\0\n]/.test(answer)));
  socket.on('connect',()=>{socket.write('zINSTREAM\0');for(let i=0;i<bytes.length;i+=65536){const part=bytes.subarray(i,i+65536);const size=Buffer.alloc(4);size.writeUInt32BE(part.length);socket.write(size);socket.write(part);}socket.write(Buffer.alloc(4));});
 });
}
const attempts=new Map<string,{count:number;until:number}>();
export function careerRateLimited(request:Request){
 const ip=request.headers.get('cf-connecting-ip')||request.headers.get('x-real-ip');if(!ip)return false;
 const now=Date.now();if(attempts.size>2000)attempts.clear();const entry=attempts.get(ip);const next=entry&&entry.until>now?{...entry,count:entry.count+1}:{count:1,until:now+900000};attempts.set(ip,next);return next.count>5;
}
