"use client";
import {useMemo,useState} from "react";
import {maxFiles,maxFileSize,maxUploadTotal,rfqServices,validRfqService} from "@/lib/rfq";
type Props={initialService:string;whatsappBase:string;enabled:boolean};
type SubmitStatus="idle"|"sending"|"success"|"error";
export function QuotationRequestForm({initialService,whatsappBase,enabled}:Props){
 const [service,setService]=useState(validRfqService(initialService)?initialService:"");
 const [status,setStatus]=useState<SubmitStatus>("idle");
 const [message,setMessage]=useState("");
 const [reference,setReference]=useState("");
 const [quantity,setQuantity]=useState("");
 const [unit,setUnit]=useState("t");
 const [contact,setContact]=useState("");
 const [company,setCompany]=useState("");
 const [files,setFiles]=useState<File[]>([]);
 const whatsapp=useMemo(()=>{
  const current=rfqServices.find(item=>item.value===service);
  const msg=["Hello HEXA Steel®, I would like to request a quotation.",
   current?"Service: "+current.label:"Please advise on my steel requirements.",
   company?"Company: "+company:"",
   contact?"Contact: "+contact:"",
   quantity?"Estimated quantity: "+quantity+" "+unit:"",
   "Please let me know how to send drawings and specifications."].filter(Boolean).join("\n");
  return whatsappBase+"?text="+encodeURIComponent(msg);
 },[service,company,contact,quantity,unit,whatsappBase]);
 function updateFiles(list:FileList|null){
  const selected=Array.from(list||[]);
  setFiles(selected);
  if(selected.length>maxFiles||selected.some(file=>file.size>maxFileSize)||selected.reduce((sum,file)=>sum+file.size,0)>maxUploadTotal)
   setMessage("Attach up to two files, maximum 5 MB each and 8 MB combined.");
  else setMessage("");
 }
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();const form=event.currentTarget;
  if(!validRfqService(service)){setStatus("error");setMessage("Please select a service.");return;}
  if(files.length>maxFiles||files.some(f=>f.size>maxFileSize)||files.reduce((n,f)=>n+f.size,0)>maxUploadTotal){setStatus("error");setMessage("Your attachments exceed the upload limits.");return;}
  setStatus("sending");setMessage("");setReference("");
  const data=new FormData(form);
  try{
   const response=await fetch("/api/rfq",{method:"POST",body:data,headers:{Accept:"application/json"}});
   const payload=await response.json() as {error?:string;reference?:string};
   if(!response.ok)throw new Error(payload.error||"Your request could not be sent.");
   if(!payload.reference)throw new Error("An RFQ reference was not returned. Contact our team.");
   setReference(payload.reference);setStatus("success");form.reset();setFiles([]);
  }catch(e){setStatus("error");setMessage(e instanceof Error?e.message:"Unable to send request. Please use WhatsApp.");}
 }
 if(status==="success")return <section className="rfq-confirmed" role="status">
   <span className="eyebrow">REQUEST ACCEPTED</span>
   <h2>Your request has been received.</h2>
   <p>Our sales team has received your technical enquiry. Your reference number is:</p>
   <div className="rfq-reference">{reference}</div>
   <p>Keep this number for correspondence. A confirmation email has been requested for your address; please check your inbox.</p>
   <div className="rfq-actions"><button type="button" className="button dark" onClick={()=>{setStatus("idle");setReference("")}}>Submit another request</button><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button rfq-alt-action">Chat with our team</a></div>
 </section>;
 return <div className="rfq-form-container">
  <div className="rfq-form-header"><span className="eyebrow">SERVICE ENQUIRY / NO ACCOUNT REQUIRED</span><h2>Tell us what you need.</h2><p>Just the essentials to start. Our team will follow up for technical clarification and pricing.</p></div>
  <div className="rfq-quick-contact"><div><strong>Prefer a direct conversation?</strong><p>Send the selected service to our sales team on WhatsApp.</p></div><a href={whatsapp} className="button rfq-whatsapp-button" target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a></div>
  {enabled?<form className="rfq-form" onSubmit={submit} encType="multipart/form-data">
   <div className="rfq-form-grid">
    <label className="rfq-field rfq-wide">01 / What can we manufacture for you?
     <select required name="service" value={service} onChange={e=>setService(e.target.value)}>
      <option value="">Choose a service</option>
      {rfqServices.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}
     </select>
    </label>
    <label className="rfq-field">Your name *<input required name="fullName" maxLength={120} autoComplete="name" placeholder="Contact person"/></label>
    <label className="rfq-field">Company *<input required name="company" maxLength={150} autoComplete="organization" placeholder="Organization" value={company} onChange={e=>setCompany(e.target.value)}/></label>
    <label className="rfq-field">Business email *<input required name="email" type="email" maxLength={180} autoComplete="email" placeholder="name@company.com"/></label>
    <label className="rfq-field">Mobile / WhatsApp *<input required name="phone" type="tel" maxLength={25} autoComplete="tel" placeholder="+966 …" value={contact} onChange={e=>setContact(e.target.value)}/></label>
    <label className="rfq-field">Estimated quantity (optional)<input name="quantity" inputMode="decimal" value={quantity} onChange={e=>setQuantity(e.target.value)} maxLength={20} placeholder="For example: 50"/></label>
    <label className="rfq-field">Unit<select value={unit} name="unit" onChange={e=>setUnit(e.target.value)}><option value="t">Tonnes</option><option value="pcs">Pieces</option><option value="m2">Square metres</option><option value="m">Metres</option></select></label>
    <label className="rfq-field">Project location<input name="location" maxLength={120} placeholder="City, Saudi Arabia"/></label>
    <label className="rfq-field">Required delivery date<input name="requiredDate" type="date"/></label>
    <label className="rfq-field rfq-wide">02 / Scope or instructions *<textarea required name="description" minLength={10} maxLength={3000} placeholder="Material, grade, dimensions, drawings, requested quantities and delivery constraints…" rows={5}/></label>
    <label className="rfq-field rfq-wide">03 / Attach technical documents (optional)<input name="attachments" multiple type="file" accept=".pdf,.dwg,.dxf,.xlsx,.docx" onChange={e=>updateFiles(e.target.files)}/>
     <small>PDF, DWG, DXF, XLSX or DOCX. Up to 2 files, 5 MB each, 8 MB total. Do not upload confidential files without authorization.</small>
    </label>
   </div>
   <label className="rfq-agreement"><input name="consent" required type="checkbox" value="yes"/> I authorize Hexa Steel® to process my contact details and submitted technical files solely for preparing this enquiry and quotation.</label>
   <label className="rfq-spam-field" aria-hidden="true">Your website<input tabIndex={-1} autoComplete="off" name="website"/></label>
   <button disabled={status==="sending"} className="button dark rfq-submit" type="submit">{status==="sending"?"Submitting request…":"Send request & receive RFQ reference"}</button>
   {message&&<p className="rfq-error" role="alert">{message}</p>}
   <p className="rfq-note">No account required. We send your request to our commercial team and email you the reference. A quote is issued separately after technical review.</p>
  </form>:<div className="rfq-email-standby"><strong>Start directly with our commercial team.</strong><p>Select a service above and use WhatsApp to send your requirements. Our team will help you share technical drawings and arrange a formal quotation.</p></div>}
 </div>;
}
