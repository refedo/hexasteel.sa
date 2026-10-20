import {getEditorialPage} from "@/lib/cms";
import type {Metadata} from "next";
import {PageHero} from "@/components/PageBlocks";
import {CareerApplications} from "@/components/CareerApplications";
export const metadata:Metadata={title:"Join Our Team — Open Positions",description:"Join Hexa Steel® in Riyadh: QA and QC engineering, steel sales, planning and document control. Each role requires 5–8 years of relevant experience."};
export default async function Careers(){const editorial=await getEditorialPage("company--careers");return <main><PageHero eyebrow="COMPANY / JOIN OUR TEAM" title="Join our team." intro={editorial?.intro||"Join our engineering, production, quality, sales and project-delivery teams. Hexa Steel® values science, flexibility and continuous learning."}/>
 <section className="section careers-section"><div className="shell"><p className="eyebrow">CURRENT CAREER OPPORTUNITIES</p><h2>Grow with <span>HEXA Steel®.</span></h2><p className="careers-intro">Select a position to read about the role and upload your CV. All positions require 5–8 years of relevant professional experience.</p><CareerApplications/></div></section></main>}
