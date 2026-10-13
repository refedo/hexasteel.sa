import Link from "next/link";
export function PageHero({eyebrow,title,intro}:{eyebrow:string,title:string,intro:string}){
return <section className="inner-hero"><div className="shell"><p className="eyebrow on-dark">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>}
export function CallToAction({heading="Discuss your next project",text="Share your requirements and our team will route your enquiry to the right specialists.",service}:{heading?:string,text?:string,service?:string}){
return <section className="closing"><div className="shell closing-grid"><div><p className="eyebrow">{text}</p><h2>{heading}</h2></div><Link className="button dark" href={service?"/request-quotation?service="+encodeURIComponent(service):"/contact"}>{service?"Request a quotation":"Contact Hexa Steel"}</Link></div></section>}
