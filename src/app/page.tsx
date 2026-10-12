import Link from "next/link";
import { brand, activities, values } from "@/content/site";
function StructureDrawing() {
  return <div className="drawing" role="img" aria-label="Schematic illustration of an engineered steel frame">
    <svg viewBox="0 0 650 410" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="currentColor" fill="none" strokeWidth="2">
        <path d="M42 304 L200 132 L520 132 L610 274 L455 374 L65 374 Z"/>
        <path d="M42 304H455L610 274M200 132V304M520 132V304M65 374V304M455 374V304"/>
        <path d="M270 132V304M340 132V304M410 132V304M480 132V304"/>
        <path d="M200 132L290 63H575L520 132M290 63L270 132M380 63L340 132M475 63L410 132M575 63L480 132"/>
        <path d="M200 132L270 304M270 132L200 304M340 132L410 304M410 132L340 304M480 132L520 304"/>
        <path d="M65 374L200 304M140 374L275 304M215 374L350 304M290 374L425 304" opacity=".3"/>
      </g>
      <path d="M200 132L290 63H575M65 374H455" stroke="#C6D547" strokeWidth="4" fill="none"/>
    </svg>
    <div className="drawing-foot"><span>STRUCTURES / SYSTEMS</span><span>07 CONTROLLED ACTIVITIES</span></div>
  </div>;
}
export default function Home() {
  return <main>
    <section className="hero"><div className="shell hero-content"><div className="hero-text">
      <p className="eyebrow on-dark">ENGINEERING · MANUFACTURING · PROJECT DELIVERY <span className="signal-dot"/></p>
      <h1>ENGINEERED<br/>WITH <em>PRECISION.</em></h1>
      <p className="hero-subtitle">Built for confidence.</p>
      <p className="hero-description">Integrated structural steel and pre-engineered building solutions—delivered through controlled manufacturing, deliberate planning and accountable site execution.</p>
      <div className="hero-actions"><Link className="button signal" href="/request-quotation">Request a quotation <span>↗</span></Link><a href="#solutions" className="quiet-link">Explore our expertise ↗</a></div>
    </div><StructureDrawing/></div><div className="shell hero-stages"><span>ENGINEERING</span><span>OPERATIONS</span><span>SITE</span><small>DELIVERY AS A DISCIPLINE</small></div></section>
    <section id="solutions" className="section"><div className="shell"><div className="section-intro"><p className="eyebrow">01 / OUR CORE SOLUTIONS</p><h2>Two disciplines.<br/><span>One standard of execution.</span></h2><p>Structural Steel and PEB share equal standing—supported by integrated engineering, manufacturing expertise and project management.</p></div>
      <div className="solutions"><article className="solution structural"><span className="eyebrow">01 / STRUCTURAL SYSTEMS</span><div className="structure-pattern" aria-hidden="true"/><div className="solution-bottom"><h3>Structural<br/>Steel</h3><p>Complex contractual structures, industrial steelworks and engineered custom fabrication.</p><Link href="/request-quotation">Discuss a structural project ↗</Link></div></article><article className="solution peb"><span className="eyebrow">02 / INDUSTRIAL BUILDINGS</span><div className="structure-pattern sloped" aria-hidden="true"/><div className="solution-bottom"><h3>Pre-Engineered<br/>Buildings</h3><p>Factories, warehouses, MODON industrial projects and in-house C/Z purlin manufacturing.</p><Link href="/request-quotation">Discuss a PEB project ↗</Link></div></article></div>
    </div></section>
    <section id="delivery" className="section delivery"><div className="shell"><div className="delivery-head"><div><p className="eyebrow on-dark">02 / CONTRACTUAL PROJECTS</p><h2>Delivery is<br/><em>a discipline.</em></h2></div><p>From design calculations and procurement to method statements, lifting plans, site surveying, alignment and handover—our teams plan and control the full steel delivery lifecycle.</p></div>
      <div className="stages"><span>01 — ENGINEERING</span><span>02 — OPERATIONS</span><span>03 — SITE</span></div><ol className="activities">{activities.map(([name,stage],i)=><li key={name}><small>{String(i+1).padStart(2,"0")}</small><strong>{name}</strong><span>{stage}</span></li>)}</ol>
      <div className="site-detail"><h3>Managed execution, on and off site.</h3><p>Project planning · Method statements · Material submittals · Lifting plans · Certified cranes · Site engineers · Surveying · Anchor bolts · Alignment · Torque tightening · Supervision · Safety & quality plans</p></div>
    </div></section>
    <section id="quality" className="section"><div className="shell quality"><div><p className="eyebrow">03 / QUALITY & COMPLIANCE</p><h2>Confidence is<br/>documented.</h2><p>Quality is embedded from approved materials and welding procedures to independent inspection and final documentation.</p></div><div className="quality-list"><div><b>01</b><strong>Procedures & control</strong><small>WPS / PQR · ITPs · NCR Control</small></div><div><b>02</b><strong>Materials & traceability</strong><small>Approved materials · MTCs · Identification</small></div><div><b>03</b><strong>Testing & verification</strong><small>Dimensional checks · NDT · DFT · Calibration</small></div><div><b>04</b><strong>Site quality & HSE</strong><small>Competent personnel · Inspection and safety plans</small></div></div></div></section>
    <section className="section values-section"><div className="shell"><p className="eyebrow">04 / OUR MINDSET DNA</p><div className="values-head"><h2>Five values.<br/>Every decision.</h2><p>Our philosophy is demonstrated through the way we engineer, manufacture, improve and work with our clients.</p></div><div className="values">{values.map(([name,description],i)=><div key={name}><small>0{i+1}</small><h3>{name}</h3><p>{description}</p></div>)}</div></div></section>
    <section id="insights" className="section growth"><div className="shell growth-grid"><div><p className="eyebrow">05 / INDUSTRIAL TRANSFORMATION</p><h2>Building the<br/>next standard.</h2><p>Investment in technology, people, standardization, industrial capacity and digital operations is central to our continuous improvement.</p><div className="facts"><div><strong>{brand.expansionSqm}<small> m²</small></strong><span>Planned MODON expansion</span></div><div><strong>7</strong><span>Delivery activities</span></div><div><strong>3</strong><span>Execution stages</span></div></div></div><div className="initiatives"><h3>Industrial development <span>↗</span></h3><p><b>MANUFACTURING</b> Laser cutting, PEB automation and C/Z purlin production</p><p><b>DIGITALIZATION</b> OTS™ internal operational development</p><p><b>PEOPLE</b> Hexa Academy and technical capability building</p><p><b>PARTNERSHIPS</b> MODON accreditation and PIF AMP Cohort #1 participation</p></div></div></section>
    <section className="section knowledge"><div className="shell knowledge-grid"><div><p className="eyebrow on-dark">06 / KNOWLEDGE CENTRE</p><h2>Knowledge<br/>moves industry<br/><em>forward.</em></h2><p>Steel engineering guides, fabrication practices, technical FAQs and industry insight—grounded in our mission of spreading knowledge.</p><Link className="button outline" href="/knowledge">Explore knowledge ↗</Link></div><div className="knowledge-list"><span className="eyebrow on-dark">UPCOMING TECHNICAL CONTENT</span><div>Structural Steel vs. PEB: choosing a building system <small>GUIDE</small></div><div>Material traceability and MTC documentation <small>QUALITY</small></div><div>The seven activities of controlled steel delivery <small>PROJECTS</small></div></div></div></section>
    <section className="closing"><div className="shell closing-grid"><div><p className="eyebrow">LET'S BUILD WITH CONFIDENCE</p><h2>Bring us your next challenge.</h2></div><Link href="/request-quotation" className="button dark">Start a project enquiry ↗</Link></div></section>
  </main>;
}
