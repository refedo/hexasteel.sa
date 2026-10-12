import type {Metadata} from "next";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {DeliveryTimeline} from "@/components/DeliveryTimeline";
export const metadata:Metadata={title:"Project Management & Site Execution"};
const capabilities=[
 ["Planning & project controls","Baseline schedules, critical-path reviews, progress measurement, dependencies, change coordination and delivery commitments."],
 ["Engineering & submittals","Method statements, material approvals, shop drawings, lifting plans, safety plans, inspection plans and RFI resolution."],
 ["Site enabling works","Setting-out and survey coordination, anchor-bolt positioning, site interface management and handover readiness."],
 ["Lifting & erection coordination","Certified crane planning, rigging interfaces, lifting permits, crane utilization and qualified subcontractor coordination where contracted."],
 ["Alignment & bolting","Erection supervision, plumb and alignment verification, controlled bolting, torque wrenching and inspection records."],
 ["HSE & quality leadership","Job-specific HSE plans, toolbox briefings, ITP witness points, NCR closeout and documented site supervision."]
];
export default function Delivery(){return <main><PageHero eyebrow="PROJECT DELIVERY / CONTRACTUAL STEELWORK" title="Deliberate planning. Disciplined delivery." intro="Our project-management capability connects engineers, fabricators, procurement teams, logistics and site partners across seven controlled activities and three integrated stages."/>
<section className="section"><div className="shell"><p className="eyebrow">OUR SEVEN-ACTIVITY DELIVERY MODEL</p><h2>One coordinated project lifecycle.</h2><DeliveryTimeline/></div></section>
<section className="section service-panel"><div className="shell"><p className="eyebrow">PROJECT MANAGEMENT & SITE CAPABILITIES</p><div className="feature-grid">{capabilities.map(([name,detail],i)=><article className="feature-card" key={name}><small>0{i+1}</small><h3>{name}</h3><p>{detail}</p></article>)}</div><p className="legal-note">Site erection is subcontracted and managed/supervised by Hexa where included in the contractual scope. Exact work packages and qualifications are project-specific.</p></div></section>
<CallToAction heading="Plan the project before fabrication starts."/></main>}
