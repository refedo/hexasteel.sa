import Link from "next/link";
import {HeroSlider} from "@/components/HeroSlider";
import {getHomeSettings} from "@/lib/cms";

const defaultClaims=[
 {figure:"THOUSANDS",unit:"OF TONNES / YEAR",description:"Steel production enabled by integrated teams and manufacturing systems",symbol:"01"},
 {figure:"300+",unit:"PROJECTS ACCOMPLISHED",description:"Management-reported project track record",symbol:"02"},
 {figure:"WIDE",unit:"APPROVAL BASE",description:"Industrial qualifications and registrations across major entities",symbol:"03"},
 {figure:"TURNKEY",unit:"STEEL SOLUTIONS",description:"Coordinated from design and detailing to site erection",symbol:"04"},
 {figure:"ADVANCED",unit:"MANUFACTURING",description:"Precision technology and automated steel processes",symbol:"05"},
] as const;

export default async function Home(){
 const settings=await getHomeSettings();
 const trustIndicators=settings.trustIndicators?.length?settings.trustIndicators:defaultClaims;
 const advantages=[
  {number:"01",title:"Agility",principle:"FLEXIBILITY · SIMPLICITY",description:"Fast decisions, practical engineering and responsive teams. We adapt to the constraints of the project instead of making the project adapt to us."},
  {number:"02",title:"Premium Quality",principle:"SCIENCE · QUALITY · TRUST",description:"Manufacturing governed by ITPs, material traceability, qualified procedures, dimensional checks and documented quality evidence."},
  {number:"03",title:"Speed of Delivery",principle:"PLANNING · EXECUTION",description:"Integrated engineering, procurement, fabrication, coating and site coordination reduce avoidable handoffs and support deliberate schedules."},
  {number:"04",title:"Supply Chain Strength",principle:"SOURCING · RELIABILITY",description:"Approved material sourcing, vendor coordination, MTC controls, procurement planning and logistics aligned to the project critical path."}
 ];
 return <main>
   <section className="hero industrial-hero"><div className="shell hero-content"><div className="hero-text">
     <p className="eyebrow on-dark">SAUDI STEEL ENGINEERING & MANUFACTURING</p>
     <h1>{settings.heroHeadline||<>ENGINEERED<br/>WITH <em>PRECISION.</em></>}</h1>
     <p className="hero-subtitle">Built for confidence.</p>
     <p className="hero-description">{settings.heroDescription||"Structural steel and pre-engineered buildings delivered with technical agility, premium quality and disciplined project execution."}</p>
     <div className="hero-actions"><Link className="button signal" href="/request-quotation">Request a quotation</Link><Link className="quiet-link" href="/products-services">Explore our services</Link></div>
   </div><HeroSlider slides={settings.heroSlides}/></div></section>
   <section className="home-trust" aria-label="HEXA Steel track record and capabilities">
    <div className="shell"><div className="home-section-heading"><p className="eyebrow">TRUST INDICATORS</p><h2>Built on capability.<br/><span>Measured by delivery.</span></h2></div>
      <div className="trust-proof-grid">{trustIndicators.map(item=><div className="trust-proof" key={item.symbol}><span className="trust-proof-n">{item.symbol}</span><strong>{item.figure}</strong><span className="trust-proof-unit">{item.unit}</span><p>{item.description}</p></div>)}</div>
      
      <div className="trust-approval-link"><span>ARAMCO · MODON · MAADEN · NWC · QIDDIYA · NEW MURABBA</span><Link href="/company/approvals">Explore approvals & qualifications</Link></div>
    </div>
   </section>
   <section className="home-market-position"><div className="shell">
    <p className="eyebrow on-dark">HEXA STEEL® / CORPORATE POSITIONING</p>
    <h2>{settings.marketPositioning||"Hexa Steel® is #1 Mid-Sized steel fabrication company in Saudi Arabia."}</h2>
    <p>A young, ambitious Saudi manufacturer accelerating its capabilities through talent, advanced technology and continuous development.</p>
   </div></section>
   <section className="home-why" id="why-hexa"><div className="shell"><div className="home-why-intro">
    <div><p className="eyebrow">WHY CHOOSE HEXA STEEL®?</p><h2>Our edge.<br/><span>Your confidence.</span></h2></div>
    <p>Our values are not wall statements. Science, Quality, Flexibility, Trust and Simplicity shape how we respond, manufacture and deliver.</p>
   </div>
   <div className="edge-editorial">{advantages.map(a=><article className="edge-row" key={a.number}><span className="edge-no">{a.number}</span><div><span className="eyebrow">{a.principle}</span><h3>{a.title}</h3></div><p>{a.description}</p></article>)}</div>
   <div className="edge-links"><Link href="/company/about">Who we are</Link><Link href="/project-delivery">Project delivery</Link><Link href="/services/supply-chain">Supply chain</Link><Link href="/capabilities/quality">Quality controls</Link></div></div></section>
   <section className="closing"><div className="shell closing-grid"><div><p className="eyebrow">YOUR NEXT STEEL PROJECT STARTS HERE</p><h2>Agility. Quality. On-time delivery.</h2></div><Link href="/request-quotation" className="button dark">Discuss your project</Link></div></section>
 </main>;
}
