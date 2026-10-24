/** Search markup uses only established public facts, no rankings or inferred approvals. */
const graph={
 "@context":"https://schema.org",
 "@graph":[
  {"@type":"Organization","@id":"https://hexasteel.sa/#organization",
   name:"HEXA Steel®",url:"https://hexasteel.sa/",
   description:"Saudi structural steel and pre-engineered building manufacturing, engineering and project delivery.",
   address:{"@type":"PostalAddress",addressLocality:"Riyadh",addressCountry:"SA"}},
  {"@type":"WebSite","@id":"https://hexasteel.sa/#website",
   url:"https://hexasteel.sa/",name:"HEXA Steel®",
   publisher:{"@id":"https://hexasteel.sa/#organization"},inLanguage:"en"}
 ]
};
export function SiteStructuredData(){
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(graph).replace(/</g,"\\u003c")}}/>;
}
