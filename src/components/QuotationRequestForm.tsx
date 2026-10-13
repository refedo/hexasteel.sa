"use client";
import {useMemo,useRef,useState} from "react";
import {maxFiles,maxFileSize,maxUploadTotal,rfqServices,rfqServiceDetails,validRfqService} from "@/lib/rfq";
type Props={initialService:string;whatsappBase:string;enabled:boolean;uploadsEnabled:boolean};
type SubmitStatus="idle"|"sending"|"success"|"error";
export function QuotationRequestForm({initialService,whatsappBase,enabled,uploadsEnabled}:Props){
 const [service,setService]=useState(validRfqService(initialService)?initialService:"");
 const [status,setStatus]=useState<SubmitStatus>("idle");
 const [message,setMessage]=useState("");
 const [reference,setReference]=useState("");
 const submissionId=useRef("");
 const [quantity,setQuantity]=useState("");
 const [unit,setUnit]=useState("t");
 const [contact,setContact]=useState("");
 const [email,setEmail]=useState("");
 const [scope,setScope]=useState("");
 const [location,setLocation]=useState("");
 const [company,setCompany]=useState("");
 const [name,setName]=useState("");
 const [files,setFiles]=useState<File[]>([]);
 const [technicalSpec,setTechnicalSpec]=useState("");
 const [technicalDetail,setTechnicalDetail]=useState("");
 const serviceDetails=validRfqService(service)?rfqServiceDetails[service]:null;
 const whatsapp=useMemo(()=>{
  const current=rfqServices.find(item=>item.value===service);
  const msg=["Hello HEXA Steel®, I would like to request a quotation.",
   current?"Service: "+current.label:"Please advise on my steel requirements.",
   company?"Company: "+company:"",
   name?"Contact person: "+name:"",
   contact?"Contact: "+contact:"",
   email?"Email: "+email:"",
   location?"Project location: "+location:"",
   scope?"Scope / specifications: "+scope:"",
   serviceDetails&&technicalSpec?serviceDetails.first+": "+technicalSpec:"",
   serviceDetails&&technicalDetail?serviceDetails.second+": "+technicalDetail:"",
   quantity?"Estimated quantity: "+quantity+" "+unit:"",
   "Please let me know how to send drawings and specifications."].filter(Boolean).join("\n");
  return whatsappBase+"?text="+encodeURIComponent(msg);
 },[service,company,name,contact,email,scope,location,quantity,unit,whatsappBase,technicalSpec,technicalDetail,serviceDetails]);
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
  if(!enabled){window.location.assign(whatsapp);return;}
  setStatus("sending");setMessage("");setReference("");
  const data=new FormData(form);
  // One UUID per unchanged enquiry; network retries cannot create duplicate RFQs.
  if(!submissionId.current)submissionId.current=crypto.randomUUID();
  data.set("submissionId",submissionId.current);
  try{
   const response=await fetch("/api/rfq",{method:"POST",body:data,headers:{Accept:"application/json"}});
   const payload=await response.json() as {error?:string;reference?:string;acknowledgementQueued?:boolean};
   if(!response.ok)throw new Error(payload.error||"Your request could not be sent.");
   if(!payload.reference)throw new Error("An RFQ reference was not returned. Contact our team.");
   setReference(payload.reference);submissionId.current="";setStatus("success");form.reset();setFiles([]);
  }catch(e){setStatus("error");setMessage(e instanceof Error?e.message:"Unable to send request. Please use WhatsApp.");}
 }
 if(status==="success")return <section className="rfq-confirmed" role="status">
   <span className="eyebrow">REQUEST ACCEPTED</span>
   <h2>Your request has been received.</h2>
   <p>Your enquiry has been securely recorded. Your reference number is:</p>
   <div className="rfq-reference">{reference}</div>
   <p>Keep this number for correspondence. Notifications to Sales and your email address are queued for delivery. A formal quotation follows technical review.</p>
   <div className="rfq-actions"><button type="button" className="button dark" onClick={()=>{setStatus("idle");setReference("")}}>Submit another request</button><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="button rfq-alt-action">Chat with our team</a></div>
 </section>;
 return <div className="rfq-form-container">
  <div className="rfq-form-header"><span className="eyebrow">SERVICE ENQUIRY / NO ACCOUNT REQUIRED</span><h2>Tell us what you need.</h2><p>{enabled?"Add your requirements, attach authorised drawings, and receive your RFQ reference on screen.":"Complete a brief enquiry below and send it directly to our team via WhatsApp. Attach drawings inside the chat."}</p></div>
  <div className="rfq-quick-contact"><div><strong>Prefer a direct conversation?</strong><p>Send the selected service to our sales team on WhatsApp.</p></div><a href={whatsapp} className="button rfq-whatsapp-button" target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a></div>
  <form className="rfq-form" onSubmit={submit} encType="multipart/form-data" onChange={()=>{if(status==="error")submissionId.current="";}}>
   <div className="rfq-form-grid">
    <label className="rfq-field rfq-wide">01 / What can we manufacture for you?
     <select required name="service" value={service} onChange={e=>{setService(e.target.value);setTechnicalSpec("");setTechnicalDetail("");}}>
      <option value="">Choose a service</option>
      {rfqServices.map(item=><option key={item.value} value={item.value}>{item.label}</option>)}
     </select>
    </label>
    {serviceDetails&&<p className="rfq-file-guidance rfq-wide">{serviceDetails.guidance}</p>}
    {serviceDetails&&<><label className="rfq-field">{serviceDetails.first} (optional)<input name="technicalSpec" maxLength={180} value={technicalSpec} onChange={e=>setTechnicalSpec(e.target.value)} placeholder={serviceDetails.firstHint}/></label><label className="rfq-field">{serviceDetails.second} (optional)<input name="technicalDetail" maxLength={180} value={technicalDetail} onChange={e=>setTechnicalDetail(e.target.value)} placeholder={serviceDetails.secondHint}/></label></>}
    <label className="rfq-field">Your name *<input required name="fullName" maxLength={120} autoComplete="name" placeholder="Contact person" value={name} onChange={e=>setName(e.target.value)}/></label>
    <label className="rfq-field">Company *<input required name="company" maxLength={150} autoComplete="organization" placeholder="Organization" value={company} onChange={e=>setCompany(e.target.value)}/></label>
    <label className="rfq-field">Business email {enabled?"*":"(optional)"}<input required={enabled} name="email" type="email" maxLength={180} autoComplete="email" placeholder="name@company.com" value={email} onChange={e=>setEmail(e.target.value)}/></label>
    <label className="rfq-field">Mobile / WhatsApp *<input required name="phone" type="tel" maxLength={25} autoComplete="tel" placeholder="+966 …" value={contact} onChange={e=>setContact(e.target.value)}/></label>
    <label className="rfq-field">Estimated quantity (optional)<input name="quantity" inputMode="decimal" value={quantity} onChange={e=>setQuantity(e.target.value)} maxLength={20} placeholder="For example: 50"/></label>
    <label className="rfq-field">Unit<select value={unit} name="unit" onChange={e=>setUnit(e.target.value)}><option value="t">Tonnes</option><option value="pcs">Pieces</option><option value="m2">Square metres</option><option value="m">Metres</option></select></label>
    <label className="rfq-field">Project location<input name="location" maxLength={120} placeholder="City, Saudi Arabia" value={location} onChange={e=>setLocation(e.target.value)}/></label>
    <label className="rfq-field">Required delivery date<input name="requiredDate" type="date"/></label>
    <label className="rfq-field rfq-wide">02 / Scope or instructions *<textarea required name="description" minLength={10} maxLength={3000} placeholder="Material, grade, dimensions, drawings, requested quantities and delivery constraints…" rows={5} value={scope} onChange={e=>setScope(e.target.value)}/></label>
    {enabled&&uploadsEnabled?<label className="rfq-field rfq-wide">03 / Attach technical documents (optional)<input name="attachments" multiple type="file" accept=".pdf,.dwg,.dxf,.xlsx,.docx" onChange={e=>updateFiles(e.target.files)}/>
     <small>PDF, DWG, DXF, XLSX or DOCX. Up to 2 files, 5 MB each, 8 MB total. Do not upload confidential files without authorization.</small>
    </label>:<p className="rfq-file-guidance">Secure website uploads are not currently active. Submit the enquiry without attachments, then contact Sales to agree an approved document transfer method. You may use WhatsApp if authorised to share the files through that service.</p>}
   </div>
   <label className="rfq-agreement"><input name="consent" required type="checkbox" value="yes"/> I consent to sharing these enquiry details with Hexa Steel® for quotation follow-up. WhatsApp is provided by a third party.</label>
   <label className="rfq-spam-field" aria-hidden="true">Your website<input tabIndex={-1} autoComplete="off" name="website"/></label>
   <button disabled={status==="sending"} className="button dark rfq-submit" type="submit">{status==="sending"?"Submitting request…":enabled?"Submit RFQ & receive reference":"Continue to WhatsApp with my enquiry"}</button>
   {message&&<p className="rfq-error" role="alert">{message}</p>}
   <p className="rfq-note">{enabled?"No account required. Your RFQ and notifications are recorded before we confirm submission. A formal quotation follows technical review.":"No account required. Clicking Continue opens WhatsApp with your enquiry pre-filled; send the message and attach drawings in the chat. No RFQ number or confirmation email is generated through WhatsApp."}</p>
  </form>
 </div>;
}
