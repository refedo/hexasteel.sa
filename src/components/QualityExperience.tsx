"use client";
import {useState} from "react";
import Link from "next/link";
const gates=[
{number:"01",name:"Materials & MIR",eyebrow:"RECEIVING INSPECTION / MIR",headline:"Approved material. Verified at receipt.",statement:"Material Inspection Requests (MIR) and receiving checks establish conformity before steel is released into production.",items:["Material Inspection Request (MIR), grade and quantity verification","Approved materials, Mill Test Certificates (MTCs) and traceability","Dimensional inspection of incoming plates and profiles"],foot:"All receiving checks and records follow the applicable approved Inspection & Test Plan (ITP)."},
{number:"02",name:"Dimensional",eyebrow:"GEOMETRIC & DIMENSIONAL CONTROL",headline:"Accuracy begins before assembly.",statement:"Dimensions of raw material, cut parts, fit-up and structural assemblies are verified against approved drawings.",items:["Dimensional checks of received materials and cut components","Member length, section geometry, fit-up and connection interfaces","Calibrated measuring instruments and documented inspections"],foot:"Inspection frequency, tolerances and hold/witness points are controlled through the project ITP."},
{number:"03",name:"Welding",eyebrow:"WELDING ASSURANCE",headline:"Qualified methods. Controlled welding.",statement:"Fabrication follows the applicable approved Welding Procedure Specifications and production quality requirements.",items:["WPS / PQR and welder qualification controls","Fit-up and visual welding inspection","NDT as specified: quality evidence and corrective action"],foot:"All welding inspections and NDT requirements are performed in accordance with the approved ITP."},
{number:"04",name:"Surface & Coating",eyebrow:"BLASTING / COATING INSPECTION",headline:"Inspect the surface before coating.",statement:"Surface preparation and protective systems are monitored through defined inspection stages, not just a final visual check.",items:["After-blasting inspection: cleanliness, surface profile and surface condition","Coating system approvals, environmental conditions and application checks","Dry Film Thickness (DFT), curing, repairs and required witness points"],foot:"Blasting, coating and fire-protection checks follow the approved project ITP and relevant coating specifications."},
{number:"05",name:"TQM & Records",eyebrow:"TOTAL QUALITY MANAGEMENT",headline:"Evidence that closes the loop.",statement:"Total Quality Management (TQM) links controlled documents, Standard Operating Procedures (SOPs), project records and continual improvement.",items:["Document control, revisions and approved SOPs / ITPs","NCR, corrective action and third-party inspection records","OTS™ tracking of operational and quality evidence where implemented"],foot:"Quality records, calibration logs and inspection releases are managed under controlled procedures and the applicable project ITP."}
] as const;
export function QualityExperience({compact=false}:{compact?:boolean}) {
 const [active,setActive]=useState(0);const g=gates[active];
 return <div className={"quality-experience"+(compact?" quality-experience-compact":"")}>
   <div className="quality-selector" role="tablist" aria-label="Explore Hexa Steel quality controls">
    {gates.map((gate,i)=><button key={gate.number} type="button" role="tab" aria-selected={i===active} aria-controls="quality-feature" className={i===active?"selected":""} onClick={()=>setActive(i)}><span>{gate.number}</span>{gate.name}</button>)}
   </div>
   <div className="quality-feature" id="quality-feature" role="tabpanel">
    <div className="quality-feature-copy"><p className="eyebrow">{g.eyebrow}</p><h3>{g.headline}</h3><p className="quality-intro">{g.statement}</p><ul>{g.items.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul><p className="quality-qualifier">{g.foot}</p>{!compact&&<Link href="/contact" className="text-link">Discuss our quality controls</Link>}</div>
    <div className="quality-technical-visual" aria-hidden="true"><div className="quality-technical-lines"><span/><span/><span/><span/><span/></div><div className="quality-technical-label">QUALITY / CHECKPOINT {g.number}</div><div className="quality-technical-count">{g.number}</div><div className="quality-technical-stamp">ITP <span>→</span> INSPECTION <span>→</span> RECORD</div></div>
   </div>
   <p className="quality-underbar">EXPLORE EACH CONTROL POINT <span>5 CHECKPOINTS · ONE CONNECTED QUALITY SYSTEM</span></p>
 </div>;
}
