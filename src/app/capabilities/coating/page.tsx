import type {Metadata} from "next";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={title:"Coating & Fire Protection"};
const systems=[
 ["Epoxy protective painting","Specified primers, intermediate and topcoat systems, with surface preparation and DFT testing suited to the applicable project specification."],
 ["Intumescent fire protection","Reactive fire-protection coatings applied under approved project system conditions, including thickness and environmental controls."],
 ["Cementitious fire protection","Sprayed/applied cementitious protection where the project specifies this system, including substrate and inspection requirements."],
 ["Galvanizing coordination","Hot-dip galvanizing through qualified external providers, with inspection against the required coating standard where in contract scope."]
];
export default function Coating(){return <main><PageHero eyebrow="CAPABILITIES / COATING & FIRE PROTECTION" title="Designed to protect. Verified to perform." intro="Coating systems are selected for the exposure environment, durability targets, fire rating and project specification—not simply aesthetic appearance."/>
<section className="section"><div className="shell feature-grid">{systems.map(([title,description],i)=><article className="feature-card" key={title}><small>0{i+1}</small><h3>{title}</h3><p>{description}</p></article>)}</div></section>
<section className="section service-panel"><div className="shell"><h2>Coating quality is measurable.</h2><p>Surface cleanliness and profile, ambient conditions, coating batch control, WFT/DFT, curing and final inspections can be documented under the approved coating ITP. Depending on the project, coating and specialist fireproofing may be performed through qualified subcontractors under Hexa coordination and inspection.</p><p className="legal-note">Do not interpret the listed systems as in-house licensed application capabilities without confirmation of the actual approved facility and applicator scope.</p></div></section>
<CallToAction heading="Specify the right protection system."/></main>}
