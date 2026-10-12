"use client";
import {useState} from "react";
import Link from "next/link";
const gates=[
{number:"01",name:"Material",eyebrow:"VERIFIED AT RECEIPT",headline:"Start with traceable steel.",statement:"Specified material is checked before it becomes part of the structure.",items:["Approved grades and material documentation","Mill Test Certificates (MTCs)","Heat identification and fabrication traceability"],foot:"Traceability begins at receiving, not at final inspection."},
{number:"02",name:"Welding",eyebrow:"CONTROLLED AT FABRICATION",headline:"Weld to an approved method.",statement:"Quality starts with qualified procedures and controlled execution.",items:["WPS and PQR as required by scope","Welder and inspector competency","Fit-up, visual inspection and controlled welding"],foot:"Independent inspection is coordinated when required by the ITP."},
{number:"03",name:"Geometry",eyebrow:"CHECKED THROUGH PRODUCTION",headline:"Precision you can verify.",statement:"Dimensions and geometry are assessed against approved fabrication deliverables.",items:["Assembly and fit-up checks","Member geometry and connection interfaces","Calibrated dimensional measurement tools"],foot:"Correct interfaces reduce costly rework at site."},
{number:"04",name:"Testing",eyebrow:"TESTED AGAINST THE ITP",headline:"Evidence beyond appearance.",statement:"Applicable inspections demonstrate conformance at defined stages.",items:["Visual inspection and specified NDT","Coating preparation and dry-film thickness (DFT)","Witness and hold points / third-party inspection"],foot:"The approved ITP defines the method, extent and acceptance criteria."},
{number:"05",name:"Handover",eyebrow:"DOCUMENTED AT RELEASE",headline:"Release only with records.",statement:"Inspection results and closeout records support accountable handover.",items:["NCR control and corrective action","Calibration records and inspection reports","Traceability and quality document compilation"],foot:"The final deliverable is both a structure and documented confidence."}
] as const;
export function QualityExperience({compact=false}:{compact?:boolean}) {
 const [active,setActive]=useState(0);
 const g=gates[active];
 return <div className={"quality-experience"+(compact?" quality-experience-compact":"")}>
   <div className="quality-selector" role="tablist" aria-label="Explore Hexa Steel quality controls">
    {gates.map((gate,i)=><button key={gate.number} type="button" role="tab" aria-selected={i===active} aria-controls="quality-feature" className={i===active?"selected":""} onClick={()=>setActive(i)}><span>{gate.number}</span>{gate.name}</button>)}
   </div>
   <div className="quality-feature" id="quality-feature" role="tabpanel">
    <div className="quality-feature-copy">
      <p className="eyebrow">{g.eyebrow}</p>
      <h3>{g.headline}</h3>
      <p className="quality-intro">{g.statement}</p>
      <ul>{g.items.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
      <p className="quality-qualifier">{g.foot}</p>
      {!compact&&<Link href="/contact" className="text-link">Discuss the project quality plan ↗</Link>}
    </div>
    <div className="quality-technical-visual" aria-hidden="true">
      <div className="quality-technical-lines"><span/><span/><span/><span/><span/></div>
      <div className="quality-technical-label">Q / CONTROL POINT {g.number}</div>
      <div className="quality-technical-count">{g.number}</div>
      <div className="quality-technical-stamp">PLAN <span>→</span> VERIFY <span>→</span> RECORD</div>
    </div>
   </div>
   <p className="quality-underbar">SELECT A CONTROL POINT TO EXPLORE THE PROCESS <span>5 CONTROL POINTS · ONE QUALITY SYSTEM</span></p>
 </div>
}
