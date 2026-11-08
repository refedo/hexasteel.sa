
import {NextResponse} from "next/server";
import {readBoundedMultipart} from "@/lib/intakeBoundary";
import {sameOrigin,supplierConfigured,supplierProxy,verifyTurnstile} from "@/lib/supplierGateway";
export const runtime="nodejs";
export async function POST(request:Request){
 if(!supplierConfigured()) return NextResponse.json({error:"Supplier tracking is not enabled yet."},{status:503});
 if(!sameOrigin(request)) return NextResponse.json({error:"Invalid request origin."},{status:403});
 const data=await readBoundedMultipart(request);
 if(!data) return NextResponse.json({error:"Invalid form or upload exceeds the permitted limit."},{status:413});
 const action=data.get("action");
 if(!["request","verify","resubmit"].includes(String(action)))return NextResponse.json({error:"Invalid request."},{status:400});
 if(action==="request" && !(await verifyTurnstile(String(data.get("cf-turnstile-response")||"")))) return NextResponse.json({error:"Complete the verification challenge."},{status:400});
 data.delete("cf-turnstile-response");
 return supplierProxy("/track",data);
}
