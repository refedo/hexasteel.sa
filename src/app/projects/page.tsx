import type {Metadata} from "next";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {ProjectExplorer} from "@/components/ProjectExplorer";
import {getProjects} from "@/lib/cms";
export const metadata:Metadata={title:"Selected Projects & References"};
export default async function Projects(){const projects=await getProjects();return <main>
  <PageHero eyebrow="PROJECTS / ENGINEERING · FABRICATION · DELIVERY" title="Proven through execution." intro="Explore structural steel, industrial facilities and selected fabrication packages delivered or undertaken by Hexa Steel® for demanding customers and developments."/>
<section className="section project-showcase-section"><div className="shell"><div className="section-intro"><p className="eyebrow">SELECTED PROJECT EXPERIENCE</p><h2>Built for demanding<br/><span>project conditions.</span></h2><p>Our portfolio is built on complex structures, detailed fabrication, controlled inspections and coordinated delivery. Explore by project type and status without disclosing confidential client identities.</p></div><ProjectExplorer projects={projects}/></div></section>
  <section className="project-execution-band"><div className="shell"><p className="eyebrow on-dark">PROJECT DELIVERY SYSTEM</p><h2>Real projects.<br/>Measured accountability.</h2><p>Planning, shop drawings, procurement, fabrication, inspection, coating, loading, logistics, installation coordination and handover—managed across seven connected activities.</p></div></section>
  <CallToAction heading="Let's execute your next steel project."/>
</main>}
