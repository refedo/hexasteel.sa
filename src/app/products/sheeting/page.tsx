import Link from "next/link";
import {purlinOffer} from "@/content/marketplace";
import {getEditorialPage} from "@/lib/cms";
import type {Metadata} from "next";
import {PageHero,CallToAction} from "@/components/PageBlocks";
import {CapabilityNarrative} from "@/components/CapabilityNarrative";
export const metadata:Metadata={
  alternates:{canonical:"https://hexasteel.sa/products/sheeting"},title:"Steel Sheeting & Cladding Accessories"};
const scenes=[
 {label:"Cladding Systems",eyebrow:"01 / BUILDING ENVELOPE",headline:"Specified for durability and performance.",description:"Single-skin profiled steel sheeting and insulated sandwich panel systems for industrial buildings, walls and roofing.",outcomes:["Single-skin roof and wall sheets","Insulated sandwich panels","Coordinated purlins and girt supports"],href:"/solutions/peb",cta:"Discover PEB solutions",symbol:"ROOF"},
 {label:"Deck Panels",eyebrow:"02 / INDUSTRIAL FLOORING",headline:"Profiled metal deck, coordinated with structure.",description:"Steel floor and roof decking selected for project-specific load and structural requirements.",outcomes:["Profiled steel deck panels","Mezzanine and industrial floors","Shear-stud and concrete design interfaces"],href:"/products/steel-accessories",cta:"Explore floor systems",symbol:"DECK"},
 {label:"Flashings & Gutters",eyebrow:"03 / DRAINAGE",headline:"Details that complete the weather envelope.",description:"Correct rainwater collection and cladding junction details are integral to the building's service life.",outcomes:["Ridge and eave flashing","Valley and eave gutters","End, corner and expansion trims"],href:"/knowledge/peb-building-components",cta:"Read building glossary",symbol:"RAIN"},
 {label:"Fasteners & Sealants",eyebrow:"04 / INSTALLATION COMPONENTS",headline:"The finish is in the details.",description:"Cladding fasteners and compatible sealing compounds selected for weather-tightness and installation performance.",outcomes:["Sheeting screws","Butyl and bead mastic seals","Lap joint and penetration accessories"],href:"/request-quotation",cta:"Request pricing",symbol:"FIX"}
];
export default async function Sheeting(){const editorial=await getEditorialPage("products--sheeting");return <main><PageHero eyebrow="PRODUCTS / SHEETING & CLADDING" title={editorial?.title||"The industrial envelope, completed."} intro={editorial?.intro||"Roof and wall cladding, deck panels and specialized sheeting accessories coordinated with steel structures and PEB packages."}/><section className="section capability-story-section"><div className="shell"><div className="section-intro"><p className="eyebrow">ROOF · WALL · FLOOR · DRAINAGE</p><h2>Protection built<br/><span>into every detail.</span></h2></div><CapabilityNarrative scenes={scenes} kicker="SHEETING & CLADDING"/></div></section><section className="section"><div className="shell">
 <div className="section-intro"><p className="eyebrow">PROFILE OPTIONS</p><h2>Decking, panels and purlins</h2></div>
 <div className="marketplace-grid">
  <article className="marketplace-card">
   <h2>Profiled steel decking</h2>
   <p>Available in 0.7–1.5 mm steel thickness. Select the rib geometry and deck thickness to suit the structural design and project requirements.</p>
   <figure><img src="/images/sheeting/deck-60.jpeg" alt="60 mm decking profile drawing with 900 mm effective cover width" width={878} height={226} loading="lazy"/><figcaption>60 mm rib sample</figcaption></figure>
   <figure><img src="/images/sheeting/deck-75-45.jpeg" alt="Two decking profile drawings with 75 mm and 45 mm ribs" width={984} height={516} loading="lazy"/><figcaption>75 mm and 45 mm rib samples</figcaption></figure>
  </article>
  <article className="marketplace-card">
   <h2>Insulated sandwich panels</h2>
   <p>Insulated roof and wall panels in 30–200 mm panel thickness, excluding the upper rib. Typical upper rib height is 25–38 mm, depending on the profile.</p>
  </article>
  <article className="marketplace-card">
   <h2>C and Z purlins</h2>
   <img src="/images/sheeting/cz-purlins.jpeg" alt="Cold-formed Z section and C section with punched holes" width={301} height={168} loading="lazy"/>
   <p>Used as secondary framing for roofs and as wall girts supporting cladding. Z sections can be lapped over supports where the structural design calls for continuity.</p>
   <ul>
    <li>C section web {purlinOffer.cWeb}</li>
    <li>Z section web {purlinOffer.zWeb}</li>
    <li>Flange {purlinOffer.flange}</li>
    <li>Lip {purlinOffer.lip}</li>
    <li>Offered steel thickness {purlinOffer.thickness}</li>
   </ul>
   <Link className="button dark" href="/marketplace">View marketplace pricing</Link>
  </article>
 </div>
 </div></section><CallToAction heading="Discuss your building envelope requirements."/></main>}