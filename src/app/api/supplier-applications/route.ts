
import {NextResponse} from "next/server";
import {sameOrigin,supplierConfigured,supplierProxy,verifyTurnstile} from "@/lib/supplierGateway";
export const runtime="nodejs";
export async function POST(request:Request){
 if(!supplierConfigured()) return NextResponse.json({error:"Supplier registration is not enabled yet."},{status:503});
 if(!sameOrigin(request)) return NextResponse.json({error:"Invalid request origin."},{status:403});
 const size=Number(request.headers.get("content-length")||"0");
 if(size>9_000_000) return NextResponse.json({error:"Attachments exceed the permitted limit."},{status:413});
 let data:FormData;
 try{data=await request.formData();}catch{return NextResponse.json({error:"Invalid registration form."},{status:400});}
 if(data.get("websiteCheck")) return NextResponse.json({error:"Invalid form submission."},{status:400});
 if(!(await verifyTurnstile(String(data.get("cf-turnstile-response")||"")))) return NextResponse.json({error:"Complete the verification challenge and retry."},{status:400});
 data.delete("cf-turnstile-response");
 data.delete("websiteCheck");
 return supplierProxy("",data);
}
