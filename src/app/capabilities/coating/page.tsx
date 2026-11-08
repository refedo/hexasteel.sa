import {getEditorialPage} from "@/lib/cms";
import type {Metadata} from "next";
import {PageHero,CallToAction} from "@/components/PageBlocks";
export const metadata:Metadata={
  alternates:{canonical:"https://hexasteel.sa/capabilities/coating"},title:"Coating, Surface Protection & Galvanization"};
const environments=[
{type:"C2",label:"Low corrosivity",example:"Dry, low-pollution indoor environments"},
{type:"C3",label:"Medium corrosivity",example:"Urban, industrial or coastal locations with moderate exposure"},
{type:"C4",label:"High corrosivity",example:"Industrial and coastal locations with higher exposure"},
{type:"C5",label:"Very high corrosivity",example:"Aggressive industrial and marine atmospheres"}
];
const systems=[
{title:"Protective Paint Systems",description:"Specified primer, intermediate and topcoat systems—including epoxy-based options—selected to match the intended atmospheric corrosivity, expected durability and applicable standard."},
{title:"Hot-Dip Galvanization",description:"Galvanizing coordinated with qualified specialist providers when required, including coating thickness and workmanship inspections under the project specification."},
{title:"Intumescent Fire Protection",description:"Reactive fire-protective coating systems selected for specified fire-resistance requirements and managed with approved product/application controls."},
{title:"Cementitious Fire Protection",description:"Cementitious fireproofing where specified, executed through appropriately qualified specialists and verified under the agreed inspection plan."}
];
export default async function Coating(){const editorial=await getEditorialPage("capabilities--coating");return <main><PageHero eyebrow="SERVICES / COATING & GALVANIZATION" title={editorial?.title||"Protecting steel for its service environment."} intro={editorial?.intro||"Hexa Steel® coordinates protective coatings, galvanization and specialist fire-protection systems against engineering specifications, exposure classes, quality plans and project requirements."}/>
<section className="section coating-class-section"><div className="shell"><p className="eyebrow">ISO 12944 / ATMOSPHERIC CORROSIVITY</p><h2>Protection matched<br/><span>to exposure.</span></h2><p className="roadmap-lede">C2, C3, C4 and C5 are environmental corrosivity categories—not guarantees of one universal paint system. Coating selection also depends on durability class, surface preparation, substrate and the project specification.</p><div className="coating-class-grid">{environments.map(x=><article key={x.type} className="coating-class"><strong>{x.type}</strong><h3>{x.label}</h3><p>{x.example}</p></article>)}</div></div></section>
<section className="section services-section"><div className="shell"><p className="eyebrow">COATING & FIRE PROTECTION SYSTEMS</p><div className="service-editorial-list">{systems.map((s,i)=><article className="service-editorial" key={s.title}><div className="service-number">0{i+1}</div><div className="service-editorial-description"><h2>{s.title}</h2><p>{s.description}</p></div><div className="service-art service-art-1" aria-hidden="true"><span className="service-art-tag">{i<2?"CORROSION PROTECTION":"FIRE PROTECTION"}</span></div></article>)}</div></div></section>
<section className="industrial-section-band"><div className="shell industrial-band-layout"><div><p className="eyebrow on-dark">INSPECTION PLAN / BLASTING TO FINAL RELEASE</p><h2>Every coating must be checked.</h2><p>After-blasting cleanliness, surface profile, environmental conditions, specified product verification, application checks, DFT and final inspection are governed by the approved coating ITP. Specialist or external application scope is stated at quotation stage.</p></div><a href="/capabilities/quality" className="button outline">Our coating inspections</a></div></section>
<CallToAction heading="Specify the environment. We'll plan the protection."/></main>}
