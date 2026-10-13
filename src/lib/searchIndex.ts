import {articles,insights,machines,references,reportedQualifications} from "@/content/site";
import {structuralSteelSearchCorpus} from "@/content/structuralSteel";
import generatedPageSearch from "@/content/generatedPageSearch.json";

export type SearchResult = {title:string;description:string;href:string;category:string;keywords?:string};
const core:SearchResult[]=[
 {title:"Products & Services",description:"Explore structural steel, PEB, steel services, design, fabrication and coating.",href:"/products-services",category:"Solutions"},
 {title:"Company Overview",description:"Company information, HEXA Steel divisions, industrial qualifications and leadership values.",href:"/company",category:"Company"},
 {title:"Who We Are",description:"Hexa Steel mission, values, supply chain and manufacturing philosophy.",href:"/company/about",category:"Company"},
 {title:"Careers",description:"Hexa Steel career enquiries and recruitment.",href:"/company/careers",category:"Company"},
 {title:"Approvals & Qualifications",description:"Company-reported manufacturer approvals, accreditation and supplier registration.",href:"/company/approvals",category:"Company",keywords:reportedQualifications.map(x=>x.name+" "+x.detail).join(" ")},
 {title:"Supply Chain & Procurement",description:"Strategic sourcing, approved material, vendor coordination, MTC, lead time planning and logistics.",href:"/services/supply-chain",category:"Services"},
 {title:"Design & Detailing",description:"Structural engineering, design codes AISC, MBMA, 3D detailing, shop drawings.",href:"/services/design-detailing",category:"Services"},
 {title:"Pipes & Vessels",description:"Piping supports, fabricated tanks and vessels under project-specific engineering requirements.",href:"/services/pipes-vessels",category:"Services"},
 {title:"PEB Frame Types",description:"Illustrated single-span, multi-span, multi-gable, lean-to, cantilever and curved PEB framing systems.",href:"/knowledge/peb-frame-systems",category:"Knowledge"},
 {title:"PEB Building Components",description:"Eave height, ridge height, rafters, joists, C/Z purlins, girts, sag rods, struts and bracing.",href:"/knowledge/peb-building-components",category:"Knowledge"},
 {title:"Sheeting & Cladding",description:"Insulated sandwich panels, single-skin sheeting, deck panels, gutters, ridge caps and sheeting accessories.",href:"/products/sheeting",category:"Products"},
 {title:"Industrial Steel Accessories",description:"Industrial handrails, grating, catwalks, guardrails, steel stairs, shear studs and crane supports.",href:"/products/steel-accessories",category:"Products"},
 {title:"Open Positions",description:"QC engineer, QC inspector, QA engineer, Sales engineer and Planning & Document Controller, 5–8 years.",href:"/company/careers",category:"Careers"},
 {title:"Fabrication Services",description:"C/Z purlin forming, laser cutting and built-up steel fabrication.",href:"/services/fabrication",category:"Services"},
 {title:"Home",description:"HEXA Steel corporate website. Structural steel, PEB and project delivery.",href:"/",category:"Pages",keywords:"engineering manufacturing factory hexa"},
 {title:"Structural Steel",description:"Complex steel structures, industrial buildings, platforms, pipe racks and commercial steel.",href:"/solutions/structural-steel",category:"Solutions",keywords:"hot rolled steel beams columns fabrication "+structuralSteelSearchCorpus},
 {title:"Pre-Engineered Buildings (PEB)",description:"Factory warehouses, industrial PEB structures, C/Z purlin production and MODON developments.",href:"/solutions/peb",category:"Solutions",keywords:"peb purlin portal frames buildings"},
 {title:"Project Management and Site Execution",description:"Seven activities: design, detailing, procurement, production, coating, delivery and erection.",href:"/project-delivery",category:"Solutions",keywords:"lifting plans installation surveying anchor bolts site construction"},
 {title:"Selected Projects",description:"Explore anonymized structural steel and industrial project references.",href:"/projects",category:"Projects",keywords:"case studies clients portfolio tonnage"},
 {title:"Steel Services and Manufacturing",description:"Precision cutting, built-up beams, C/Z purlins and fabrication services.",href:"/capabilities/machinery",category:"Capabilities",keywords:"laser CNC cutting assembly welding steel"},
 {title:"Quality Control & Assurance",description:"MIR, ITP, welding WPS/PQR, dimensional checks, NDT, DFT, TQM, SOP and traceability.",href:"/capabilities/quality",category:"Capabilities",keywords:"inspection testing plan quality MTC CWI document control"},
 {title:"Coating & Fire Protection",description:"Epoxy coatings, intumescent and cementitious systems, blasting, DFT.",href:"/capabilities/coating",category:"Capabilities",keywords:"painting primer surface protection coating"},
 {title:"Operational Excellence & OTS™",description:"SIRI, digital operations, process standardization, people, expansion, Hexa Academy.",href:"/company/operational-excellence",category:"Company",keywords:"TOISC TQM continuous improvement smart industry digitalization"},
 {title:"People & Hexa Academy",description:"Engineering, leadership, fabrication teams, capability and technical development.",href:"/company/people",category:"Company",keywords:"training team careers"},
 {title:"Knowledge Centre",description:"Steel engineering guides, materials, quality and project delivery FAQs.",href:"/knowledge",category:"Knowledge",keywords:"learn FAQ technical articles"},
 {title:"News & Insights",description:"Industrial progress, SIRI, AMP, PSF, SIF and MODON milestones.",href:"/insights",category:"Insights",keywords:"news blog announcements"},
 {title:"Contact Hexa Steel",description:"Contact our commercial or technical teams.",href:"/contact",category:"Contact",keywords:"phone email enquiry"},
 {title:"Request a Quotation",description:"RFQ enquiries for structural steel, PEB and steel services.",href:"/request-quotation",category:"Contact",keywords:"pricing quote cost estimation"},
];
export const staticSearchIndex:SearchResult[]=[
 ...core.map(item=>({...item,keywords:[item.keywords,generatedPageSearch[item.href as keyof typeof generatedPageSearch]||""].filter(Boolean).join(" ")})),
 ...machines.map(x=>({title:x.name,description:x.service,href:"/capabilities/machinery#"+x.slug,category:"Capabilities",keywords:x.outcomes.join(" ")})),
 ...references.map(x=>({title:x.title,description:x.description,href:"/projects/"+x.slug,category:"Projects",keywords:x.category+" "+x.size+" "+x.year})),
 ...articles.map(x=>({title:x.title,description:x.intro,href:"/knowledge/"+x.slug,category:"Knowledge",keywords:x.sections.map(y=>y.join(" ")).join(" ")})),
 ...insights.map(x=>({title:x.title,description:x.summary,href:"/insights/"+x.slug,category:"Insights",keywords:x.category+" "+x.date+" "+((generatedPageSearch as Record<string,string>)["/insights/"+x.slug]||"")})),
];
export function rankSearch(query:string,entries:SearchResult[],max=18){
 const input=query.trim().toLowerCase().replace(/\s+/g," ");
 if(input.length<2)return [];
 const parts=input.split(" ").filter(x=>x.length>=2);
 return entries.map(item=>{
   const title=item.title.toLowerCase(),description=item.description.toLowerCase(),keywords=(item.keywords||"").toLowerCase(),category=item.category.toLowerCase();
   let score=0;if(title.includes(input))score+=24;if(description.includes(input))score+=12;
   for(const term of parts){if(title.includes(term))score+=8;if(category.includes(term))score+=4;if(description.includes(term))score+=3;if(keywords.includes(term))score+=1;}
   return {item,score};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.item.title.localeCompare(b.item.title)).slice(0,max).map(x=>x.item);
}
