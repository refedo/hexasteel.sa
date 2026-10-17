export const brand = {
  name: "HEXA Steel®",
  expansionSqm: "16,415",
  linkedIn: "https://www.linkedin.com/company/hexametals/",
  accentDefault: "#C6D547",
};
export const navigation = [
 {label:"Products & Services",href:"/products-services",children:[
  {label:"Structural Steel",href:"/solutions/structural-steel"},
  {label:"Pre-Engineered Buildings (PEB)",href:"/solutions/peb"},
  {label:"Steel Design & Detailing",href:"/services/design-detailing"},
  {label:"Steel Fabrication & Processing",href:"/services/fabrication"},
  {label:"Manufacturing Services",href:"/capabilities/machinery"},
  {label:"Pipes & Vessels",href:"/services/pipes-vessels"},
  {label:"Sheeting & Cladding",href:"/products/sheeting"},
  {label:"Steel Accessories",href:"/products/steel-accessories"},
  {label:"Coating & Galvanization",href:"/capabilities/coating"}
 ]},
 {label:"Project Delivery",href:"/project-delivery"},
 {label:"Projects",href:"/projects"},
 {label:"Company",href:"/company",children:[
  {label:"Who We Are",href:"/company/about"},
  {label:"Approvals & Qualifications",href:"/company/approvals"},
  {label:"Quality & Certifications",href:"/capabilities/quality"},
  {label:"Operational Excellence & OTS™",href:"/company/operational-excellence"},
  {label:"People & Hexa Academy",href:"/company/people"},
  {label:"Careers",href:"/company/careers"}
 ]},
 {label:"Knowledge Centre",href:"/knowledge",children:[
  {label:"Engineering Guides",href:"/knowledge"},
  {label:"Steel Grades & Traceability",href:"/knowledge/steel-grades-traceability"},
  {label:"PEB Frame Types",href:"/knowledge/peb-frame-systems"},
  {label:"PEB Components",href:"/knowledge/peb-building-components"},
  {label:"Technical FAQs",href:"/knowledge#faq"}
 ]},
 {label:"Insights",href:"/insights"},
 {label:"Careers",href:"/company/careers"},
] as const;
export const reportedQualifications=[
 {name:"Saudi Aramco",detail:"Manufacturer approval — subject to approved product scope"},
 {name:"Maaden",detail:"Company-reported qualification / procurement relationship"},
 {name:"National Water Company (NWC)",detail:"Company-reported qualification / registration"},
 {name:"Qiddiya",detail:"Company-reported qualification / registration"},
 {name:"New Murabba",detail:"Company-reported qualification / registration"},
 {name:"MODON",detail:"Industrial facility accreditation and project experience"},
 {name:"Water Transmission Company (WTCO)",detail:"Water infrastructure engagement"},
 {name:"Red Sea Global",detail:"Project delivery experience"},
 {name:"Alfanar",detail:"Industrial project engagement"},
 {name:"Saudi Electricity Company (SEC)",detail:"Energy infrastructure engagement"},
 {name:"SEVEN Entertainment",detail:"Project delivery experience"}
] as const;
export const activityGroups = [
  { stage: "Engineering", summary: "Translate requirements into coordinated, buildable deliverables.", activities: [
    { name:"Design", description:"Structural analysis, calculations and design coordination." },
    { name:"Detailing", description:"Shop drawings, connection details, BOMs and revision control." },
  ]},
  { stage: "Operations", summary: "Control materials and manufacturing through documented checkpoints.", activities: [
    { name:"Procurement", description:"Approved sourcing, MTCs, delivery schedules and traceability." },
    { name:"Production", description:"Cutting, fit-up, welding, inspection and manufacturing records." },
    { name:"Coating", description:"Surface preparation, epoxy/intumescent/cementitious systems as specified." },
    { name:"Delivery", description:"Packing, lifting and loading plans, dispatch and logistics." },
  ]},
  { stage: "Site", summary: "Execute the approved installation scope safely and accurately.", activities: [
    { name:"Erection", description:"Subcontracted erection under Hexa project supervision where contracted." },
  ]},
] as const;
export const activities = activityGroups.flatMap(group=>group.activities.map(a=>[a.name,group.stage] as const));
export const values = [
  ["Science","Technical judgment, engineering calculations and evidence-led improvement."],
  ["Quality","Controlled fabrication, traceability, inspection and documented compliance."],
  ["Flexibility","Solutions responsive to site conditions, client programs and constructability."],
  ["Trust","Transparent coordination, responsible commitments and accountable delivery."],
  ["Simplicity","Clear drawings, communication, workflows and disciplined execution."],
] as const;
export const machines=[
  {slug:"laser-cutting",name:"Precision Laser Cutting",type:"CNC PLATE & PROFILE PROCESSING",service:"Complex plate geometries, repeatable components, efficient nesting and clean CNC-cut profiles.",headline:"LASER",outcomes:["Custom-cut plates for industrial structures","Repeatable fabrication components","Design-driven plate cutting and nesting"]},
  {slug:"built-up-sections",name:"Built-Up Steel Sections",type:"AUTOMATED ASSEMBLY & WELDING",service:"Fabricated structural members tailored to the geometry, loads and detailing requirements of each project.",headline:"BUILT-UP",outcomes:["Custom welded columns and beams","Repeatable dimensional consistency","Integrated fabrication and inspection"]},
  {slug:"cz-purlins",name:"C/Z Purlin Manufacturing",type:"SECONDARY STEEL SYSTEMS",service:"Cold-formed purlins and girts for industrial buildings, warehouses and PEB applications.",headline:"C / Z",outcomes:["Project-specific C and Z profiles","Roof purlins and wall girts","Direct orders or complete PEB packages"]},
  {slug:"steel-fabrication",name:"Structural Steel Fabrication",type:"FULL-SERVICE FABRICATION",service:"Fit-up, fabrication, welding, finishing and inspection for complex contractual steel assemblies.",headline:"STEEL",outcomes:["Fabrication-ready assemblies","Coordinated quality records","Integration with coating and delivery"]},
];
export const references=[
 {slug:"industrial-structure-large-2025",title:"Major Industrial Structural Steel Package",category:"Structural Steel",year:"2025",size:"1,115 t",description:"Large industrial steel fabrication package integrating documented production, quality inspection and delivery coordination.",status:"Completed",image:""},
 {slug:"industrial-facility-steelwork-2024",title:"Industrial Facility Steelwork",category:"Structural Steel",year:"2024",size:"440 t",description:"Industrial structural package with managed fabrication, quality documentation and material delivery.",status:"Completed",image:""},
 {slug:"specialty-steelwork-2024",title:"Specialty Structural Steel Package",category:"Structural Steel",year:"2024",size:"335 t",description:"Project-specific structural steel assemblies supported by inspection and coordinated project logistics.",status:"Completed",image:""},
 {slug:"complex-structures-2026",title:"Complex Structural Steel Assemblies",category:"Structural Steel",year:"2026",size:"440 t",description:"A contracted complex structural steel package progressing through the engineering and manufacturing delivery lifecycle.",status:"Ongoing",image:""},
 {slug:"airport-infrastructure-steel",title:"Airport Infrastructure Steelwork",category:"Specialty Steelworks",year:"",size:"",description:"Specialty fabrication and coordinated steel supply for infrastructure environments.",status:"Status to confirm",image:""},
 {slug:"industrial-pipe-supports",title:"Industrial Pipe Supports & Steelwork",category:"Industrial Steelworks",year:"",size:"",description:"Industrial steelwork and fabrication support for manufacturing and process facilities.",status:"Status to confirm",image:""},
 {slug:"industrial-building-reference",title:"Industrial Facility Steelwork",category:"Industrial Buildings",year:"",size:"",description:"Industrial building steelwork coordinated with fabrication and procurement.",status:"Status to confirm",image:""},
 {slug:"water-infrastructure-steelwork",title:"Water Infrastructure Steelwork",category:"Infrastructure Steel",year:"",size:"",description:"Steel fabrication and delivery support for water infrastructure development.",status:"Status to confirm",image:""},
 {slug:"commercial-steel-reference",title:"Commercial Structural Steel Package",category:"Structural Steel",year:"",size:"",description:"Structural steelwork for commercial building construction.",status:"Status to confirm",image:""},
];
export const insights=[
  {slug:"amp-cohort-one",category:"Strategic Initiative",date:"September 2024",title:"Hexa Steel® selected for PIF AMP Cohort #1",summary:"Hexa joined Cohort #1 of the Accelerated Manufacturing Program (AMP) by the Public Investment Fund (PIF)."},
  {slug:"private-sector-forum-2025",category:"Industry Engagement",date:"February 2025",title:"Hexa at PIF Private Sector Forum (PSF) 2025",summary:"Participation in the Public Investment Fund (PIF) Private Sector Forum (PSF), supporting partnerships across Saudi industry."},
  {slug:"saudi-industry-forum-2025",category:"Industry Engagement",date:"June 2025",title:"Hexa at Saudi Industry Forum (SIF) 2025",summary:"Participation in Saudi Industry Forum (SIF) at Dhahran Expo, connecting with industrial partners and manufacturers."},
  {slug:"siri-assessment-2025",category:"Operational Excellence",date:"2025",title:"Hexa Steel® conducts SIRI industrial maturity assessment",summary:"Hexa undertook the Smart Industry Readiness Index (SIRI) assessment to identify opportunities in industrial processes, technology and organisational maturity."},
  {slug:"aramco-approval-2025",category:"Manufacturing Qualification",date:"October 2025",title:"Hexa Steel® gains Aramco manufacturer approval",summary:"A significant qualification milestone reflecting Hexa's commitment to manufacturing standards and industrial development."},
  {slug:"modon-expansion-2026",category:"Industrial Growth",date:"2026 — Planned",title:"Hexa's planned 16,415 m² MODON expansion",summary:"Planned industrial development supporting expanded manufacturing capability, process integration and long-term growth."},
];
export const articles=[
  {slug:"structural-steel-vs-peb",category:"Engineering Guide",title:"Structural Steel vs. PEB: How to Choose the Appropriate Building System",intro:"The right structural system depends on loads, geometry, future expansion, fire requirements, lifecycle expectations and delivery constraints.",sections:[
    ["Begin with functional requirements","Define the building use, crane loads, clear spans, expansion requirements and imposed services. The preferred solution is the one that satisfies the full duty of the building, not simply the lowest fabrication price."],
    ["Understand structural trade-offs","PEB systems can be efficient for repeatable low-rise industrial forms. Conventional structural steel offers flexibility for demanding geometries, multi-storey structures, high concentrated loads, and unusual integration requirements."],
    ["Evaluate the whole delivery program","Consider connection design, architectural coordination, procurement, coating, transport, site lifting and erection access. Detailing and logistics affect total project performance."],
    ["Ask Hexa to evaluate","Share drawings, design criteria and the intended use. Our engineering and project teams can discuss the implications of each approach. A project-specific structural design remains essential."]
  ]},
  {slug:"steel-material-traceability",category:"Quality Guide",title:"Material Traceability, MTCs and Inspection Records in Steel Fabrication",intro:"Traceability connects purchased material to an installed structural member and gives the client confidence that documented requirements have been followed.",sections:[
    ["Approved material at receipt","Review specified grades, purchase documents, mill test certificates and identification before releasing material to production. MTCs alone do not replace physical verification."],
    ["Preserve identification through production","Material tags and heat references must remain linked through cutting, assembly and fabrication in accordance with the project's approved traceability plan."],
    ["Record inspections at the right stages","Dimensional checks, weld inspections, relevant NDT and coating inspection should be recorded at agreed hold and witness points in the ITP."],
    ["Close the documentation loop","Calibration status, NCR closure and final inspection records support transparent handover documentation. Actual project requirements govern the acceptance criteria."]
  ]},
  {slug:"seven-activities-steel-project-delivery",category:"Project Delivery Guide",title:"Seven Activities Behind Controlled Steel Project Delivery",intro:"Design, detailing, procurement, production, coating, delivery and erection are not isolated departments—they are linked commitments.",sections:[
    ["Engineering: Design and detailing","Validate design criteria, coordinate calculations, produce fabrication-ready drawings and manage revisions before release."],
    ["Operations: Procurement to delivery","Align procurement lead times with cutting, fabrication, welding, inspection, coating, packing and planned dispatch dates."],
    ["Site: Erection and handover","Establish method statements, lifting plans, site access, survey controls, alignment, bolting and safety measures. Erection may be delivered by qualified subcontractors under Hexa management where contracted."],
    ["Managing constraints","Use progress tracking, RFIs, NCRs, critical-path reviews and evidence-based coordination to bring deviations to the surface early."]
  ]},
  {slug:"steel-grades-traceability",category:"Materials & Quality Guide",title:"Steel Grades, Heat Numbers & Material Traceability",intro:"A practical guide to material standards, mill certificates, grade selection, yield strength, heat-number control and traceability in structural steel fabrication.",sections:[
    ["Understand grades before selecting material","Common structural steel specifications include ASTM A36 and A572, EN 10025 S235/S275/S355 and project-specific materials. These grades are not interchangeable without an engineering assessment of mechanical, chemical, welding and toughness requirements."],
    ["Yield strength versus tensile strength","Yield strength describes the stress at which permanent deformation begins; ultimate tensile strength describes the maximum stress before necking or fracture. Design codes specify how material properties are used with applicable resistance factors and load combinations."],
    ["Heat number and Mill Test Certificate (MTC)","Each steel heat or batch identifier connects the material to its mill inspection certificate. The MTC provides the declared grade and relevant chemical and mechanical test results. Material Inspection Requests (MIRs) and receiving checks help validate deliveries."],
    ["Traceability after cutting and fabrication","Maintain heat / identification references as plates and sections are cut into pieces and assembled. Approved material traceability procedures determine how parts are identified, transferred and recorded through welding, coating and dispatch."],
    ["Standards and engineering coordination","Structural design may follow the specified AISC standard; PEB projects may apply MBMA guidance where appropriate; welding is controlled under applicable AWS D1.1 requirements. Final selections depend on contract specifications and competent engineering review."]
  ]},
];
export const faqs=[
  ["Does Hexa Steel manufacture both structural steel and PEB?","Yes. Both are core solutions. The most suitable system depends on project geometry, loading, scope and schedule."],
  ["Can Hexa deliver project management and site supervision?","Hexa provides planning, engineering coordination, manufacturing management and site supervision within the contracted scope. Erection is subcontracted where included."],
  ["Can we request laser cutting or C/Z purlins separately?","Yes. Steel Services include machining and forming capabilities, subject to material specification, machine envelope, quantities and scheduling."],
  ["Which coating systems can be arranged?","Depending on project specifications, surface preparation and epoxy, intumescent, cementitious fire-protection or other approved systems can be coordinated and controlled."],
  ["What quality documentation is available?","Project requirements may include MTCs, material traceability, WPS/PQR, ITPs, dimensional reports, NDT results, DFT records, calibration and NCR close-out."],
  ["What is Hexa's monthly production capacity?","Capacity depends on the product mix and shared fabrication, welding, material handling and coating constraints. Our engineering, fabrication and delivery teams assess the achievable output against the specific product mix and delivery program."],
] as const;
