import Link from "next/link";
import {brand, values, machines, insights, articles} from "@/content/site";
import {DeliveryTimeline} from "@/components/DeliveryTimeline";

const Photo = ()=> <div className="hero-photograph" role="img" aria-label="Large industrial steel structure under construction"><div className="hero-photo-shade"/><div className="hero-photo-label">STRUCTURAL STEEL / INDUSTRIAL BUILDINGS <span>REFERENCE PHOTOGRAPHY</span></div></div>;

export default function Home(){
return <main>
  <section className="hero industrial-hero"><div className="shell hero-content">
    <div className="hero-text"><p className="eyebrow on-dark">ENGINEERING · MANUFACTURING · PROJECT DELIVERY</p>
      <h1>ENGINEERED<br/>WITH <em>PRECISION.</em></h1>
      <p className="hero-subtitle">Built for confidence.</p>
      <p className="hero-description">Structural steel and pre-engineered buildings backed by engineered solutions, documented quality, disciplined project management and controlled site execution.</p>
      <div className="hero-actions"><Link className="button signal" href="/request-quotation">Request a quotation ↗</Link><Link href="/projects" className="quiet-link">Explore our projects ↗</Link></div>
    </div><Photo/>
  </div><div className="shell hero-stages"><span>ENGINEERING</span><span>OPERATIONS</span><span>SITE</span><small>7 ACTIVITIES · 3 INTEGRATED STAGES</small></div></section>

  <section className="section" id="solutions"><div className="shell">
    <div className="section-intro"><p className="eyebrow">01 / OUR SOLUTIONS</p><h2>Built for complexity.<br/><span>Made for industry.</span></h2><p>Two equally important disciplines, supported by one engineering and delivery culture.</p></div>
    <div className="solutions">
      <article className="solution structural"><span className="eyebrow">CORE SOLUTION / 01</span><div className="structure-pattern" aria-hidden="true"/><div className="solution-bottom"><h3>Structural<br/>Steel</h3><p>Complex industrial, commercial and infrastructure steel structures—coordinated from technical design through fabrication and site execution.</p><Link href="/solutions/structural-steel">Explore Structural Steel ↗</Link></div></article>
      <article className="solution peb"><span className="eyebrow">CORE SOLUTION / 02</span><div className="structure-pattern sloped" aria-hidden="true"/><div className="solution-bottom"><h3>Pre-Engineered<br/>Buildings</h3><p>Industrial factories, warehouses, MODON facilities and expansions with in-house primary framing and C/Z purlin manufacturing.</p><Link href="/solutions/peb">Explore PEB ↗</Link></div></article>
    </div></div></section>

  <section className="section delivery" id="delivery"><div className="shell">
    <div className="delivery-head"><div><p className="eyebrow on-dark">02 / CONTRACTUAL PROJECT DELIVERY</p><h2>Delivery is<br/><em>a discipline.</em></h2></div><p>Our project teams integrate design, detailing, procurement, manufacturing, coating, logistics and erection management. Every interface matters.</p></div>
    <DeliveryTimeline compact/>
    <div className="site-detail"><div><h3>Project Management & Site Execution</h3><Link className="text-link light-link" href="/project-delivery">Explore our delivery systems ↗</Link></div><p>Master planning · RFI & submittals · Method statements · Lifting plans · Certified cranes · Surveying · Anchor bolts · Alignment · Torque tightening · Site supervision · HSE & QA/QC</p></div>
  </div></section>

  <section className="section quality-section" id="quality"><div className="shell quality"><div><p className="eyebrow">03 / QUALITY CONTROL</p><h2>Precision is<br/>not accidental.</h2><p>Material traceability, WPS/PQR, approved ITPs, dimensional verification, NDT, coating DFT testing and NCR control give our clients documentary evidence of execution.</p><Link className="text-link" href="/capabilities/quality">Explore our quality system ↗</Link></div>
  <div className="quality-list">
    <div><b>01</b><strong>Welding governance</strong><small>Qualified procedures · CWI competency · Welding inspection</small></div>
    <div><b>02</b><strong>Full material traceability</strong><small>Approved material · MTCs · Heat / piece references</small></div>
    <div><b>03</b><strong>Inspection & testing</strong><small>ITPs · Dimensional controls · NDT · DFT · Calibration</small></div>
    <div><b>04</b><strong>Close-out evidence</strong><small>Documentation packs · NCR closure · Third-party inspections</small></div>
  </div></div></section>

  <section className="section" id="machines"><div className="shell"><div className="section-intro"><p className="eyebrow">04 / STEEL SERVICES & MACHINERY</p><h2>Manufacturing<br/><span>by design.</span></h2><p>Laser cutting, automatic built-up welding and C/Z purlin forming bring speed, consistency and greater process control.</p></div>
  <div className="machine-grid">{machines.map(m=><article key={m.slug} className="machine-card"><span className="machine-overline">{m.type}</span><div className="machine-number">{m.headline}</div><h3>{m.name}</h3><p>{m.service}</p><Link href={"/capabilities/machinery#"+m.slug}>View machine capability ↗</Link></article>)}</div>
  <div className="feature-strip"><div><h3>Production, expressed in tonnes.</h3><p>Approximately 2,250 tonnes in 2025 (management-reported historic output, pending verification). Current sustainable monthly capacity varies by product mix, manpower, handling and coating bottlenecks; the confirmed rate will be published following a production capacity assessment.</p></div><Link href="/capabilities/machinery">Manufacturing capabilities ↗</Link></div>
  </div></section>

  <section className="section coating-teaser"><div className="shell coating-teaser-grid"><div><p className="eyebrow">05 / COATING & FIRE PROTECTION</p><h2>Protection specified.<br/>Execution controlled.</h2><p>Project-specific coating coordination across epoxy protective systems, intumescent fireproofing and cementitious fire protection, supported by surface-preparation controls and DFT verification.</p><Link className="text-link" href="/capabilities/coating">Explore coating solutions ↗</Link></div><div className="coating-stacks"><span>01 / EPOXY SYSTEMS</span><span>02 / INTUMESCENT PAINT</span><span>03 / CEMENTITIOUS FIRE PROTECTION</span><span>04 / INSPECTION & DOCUMENTATION</span></div></div></section>

  <section className="section values-section"><div className="shell"><p className="eyebrow">06 / MINDSET DNA</p><div className="values-head"><h2>Five values.<br/>Every decision.</h2><p>Science, Quality, Flexibility, Trust and Simplicity govern how we engineer, manufacture, deliver and improve.</p></div><div className="values">{values.map(([name,description],i)=><div key={name}><small>0{i+1}</small><h3>{name}</h3><p>{description}</p></div>)}</div></div></section>

  <section className="section growth" id="insights"><div className="shell growth-grid"><div><p className="eyebrow">07 / INDUSTRIAL TRANSFORMATION</p><h2>Building the<br/>next standard.</h2><p>Operational excellence is a continuous practice: standardization, digital process control, advanced machinery, industrial assessments, trained people and vertical integration.</p><div className="facts"><div><strong>{brand.expansionSqm}<small> m²</small></strong><span>Planned MODON facility expansion</span></div><div><strong>7</strong><span>Project delivery activities</span></div><div><strong>3</strong><span>Coordinated stages</span></div></div><Link className="text-link" href="/company/operational-excellence">Our continuous improvement journey ↗</Link></div><div className="initiatives"><h3>Operational excellence <span>↗</span></h3><p><b>DIGITAL DEVELOPMENT</b> OTS™ internal operations and quality traceability</p><p><b>ASSESSMENT</b> SIRI and internal FDI / OPERI diagnostic methodologies</p><p><b>PEOPLE</b> Hexa Academy and technical professional development</p><p><b>INDUSTRIAL GROWTH</b> MODON projects, accreditation and expansion</p><p><b>INDUSTRY ENGAGEMENT</b> PIF AMP Cohort #1 and industrial forums</p></div></div></section>

  <section className="section editorial-home"><div className="shell"><div className="section-intro"><p className="eyebrow">08 / KNOWLEDGE & INSIGHTS</p><h2>Spreading knowledge.<br/><span>Sharing progress.</span></h2><p>Practical technical guidance and corporate milestones, available as individual articles you can read and share.</p></div>
    <div className="editorial-grid"><article className="editorial-feature"><span>KNOWLEDGE CENTRE</span><h3>{articles[0].title}</h3><p>{articles[0].intro}</p><Link href={"/knowledge/"+articles[0].slug}>Read technical guide ↗</Link></article>
    {insights.slice(0,2).map(item=><article key={item.slug} className="editorial-card"><span>{item.category} · {item.date}</span><h3>{item.title}</h3><p>{item.summary}</p><Link href={"/insights/"+item.slug}>Read milestone ↗</Link></article>)}</div>
    <div className="editorial-actions"><Link href="/knowledge">Visit Knowledge Centre ↗</Link><Link href="/insights">All news & initiatives ↗</Link><Link href="/projects">Our project portfolio ↗</Link></div>
  </div></section>

  <section className="closing"><div className="shell closing-grid"><div><p className="eyebrow">READY TO BUILD WITH CONFIDENCE?</p><h2>Bring us your next challenge.</h2></div><Link href="/request-quotation" className="button dark">Discuss your project ↗</Link></div></section>
</main>;
}
