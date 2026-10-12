export const brand = {
  name: "HEXA Steel®",
  expansionSqm: "16,415",
  linkedIn: "https://www.linkedin.com/company/hexametals/",
  accentDefault: "#C6D547",
};
export const navigation = [
  ["Solutions", "/solutions/structural-steel"],
  ["Project Delivery", "/project-delivery"],
  ["Projects", "/projects"],
  ["Capabilities", "/capabilities/machinery"],
  ["Knowledge", "/knowledge"],
  ["Insights", "/insights"],
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
  {slug:"bodor-a12",name:"Bodor A12",type:"Large-format fiber laser",service:"Heavy plate laser cutting",headline:"20 kW",specs:["2,500 × 12,000 mm work area","Previously specified cutting up to 50 mm, material dependent","Nesting and CNC cutting"],note:"Maximum thickness requires confirmation by material, grade and edge-quality standard."},
  {slug:"bodor-a3",name:"Bodor A3",type:"CNC fiber laser",service:"Sheet and plate cutting",headline:"6 kW",specs:["1,500 × 3,000 mm work area","Previously specified cutting up to 25 mm, material dependent","Production cutting for components and assemblies"],note:"Published values are machine specifications, not guaranteed throughput."},
  {slug:"primo-awb",name:"Primo AWB-1500",type:"Automatic built-up PEB welding",service:"Built-up beam manufacturing",headline:"SAW",specs:["Web height up to 1,500 mm (prior specification)","Flange width up to 260 mm (prior specification)","Automatic assembly / double-head welding"],note:"Confirm section envelope and performance against exact machine configuration."},
  {slug:"bms-cz",name:"BMS Automatic C/Z Line",type:"Automatic purlin roll forming",service:"Purlins and girts",headline:"C / Z",specs:["C sections: C80–300","Z sections: Z120–300","PLC-based automatic size change"],note:"Thickness, punching, speed, materials and tolerances pending commissioning verification."},
];
export const references=[
  {slug:"complex-industrial-steel-2025",title:"Complex structural steel package",category:"Structural Steel",year:"2025",size:"1,115 t",description:"Large-tonnage structural steel reference. The full technical case study and customer attribution are being prepared for approval.",status:"Reference under review"},
  {slug:"industrial-structure-2024",title:"Industrial manufacturing facility steelwork",category:"Structural Steel",year:"2024",size:"440 t",description:"Industrial steel project reference with manufacturing, quality documentation and coordinated dispatch.",status:"Reference under review"},
  {slug:"specialty-structures-2024",title:"Specialty structural steel package",category:"Structural Steel",year:"2024",size:"335 t",description:"Project reference highlighting controlled fabrication and project logistics.",status:"Reference under review"},
];
export const insights=[
  {slug:"amp-cohort-one",category:"Strategic Initiative",date:"September 2024",title:"Hexa Steel® selected for PIF AMP Cohort #1",summary:"Hexa joined the first cohort of the Accelerated Manufacturing Program, supporting industrial capability development."},
  {slug:"private-sector-forum-2025",category:"Industry Engagement",date:"February 2025",title:"Hexa Steel® participates in the PIF Private Sector Forum",summary:"Engaging with the wider Saudi private-sector and industrial ecosystem."},
  {slug:"saudi-industry-forum-2025",category:"Industry Engagement",date:"June 2025",title:"Our participation in Saudi Industry Forum, Dhahran",summary:"Connecting with industry partners and sharing our manufacturing capabilities."},
  {slug:"aramco-approval-2025",category:"Milestone",date:"October 2025",title:"Hexa achieves Aramco manufacturer approval",summary:"A manufacturing qualification milestone. Approved categories and scope will be disclosed once documentation is validated."},
  {slug:"modon-expansion-2026",category:"Industrial Growth",date:"2026 — Planned",title:"16,415 m² MODON facility expansion",summary:"Our planned industrial expansion will support the next phase of manufacturing capability and vertical integration."},
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
  ]}
];
export const faqs=[
  ["Does Hexa Steel manufacture both structural steel and PEB?","Yes. Both are core solutions. The most suitable system depends on project geometry, loading, scope and schedule."],
  ["Can Hexa deliver project management and site supervision?","Hexa provides planning, engineering coordination, manufacturing management and site supervision within the contracted scope. Erection is subcontracted where included."],
  ["Can we request laser cutting or C/Z purlins separately?","Yes. Steel Services include machining and forming capabilities, subject to material specification, machine envelope, quantities and scheduling."],
  ["Which coating systems can be arranged?","Depending on project specifications, surface preparation and epoxy, intumescent, cementitious fire-protection or other approved systems can be coordinated and controlled."],
  ["What quality documentation is available?","Project requirements may include MTCs, material traceability, WPS/PQR, ITPs, dimensional reports, NDT results, DFT records, calibration and NCR close-out."],
  ["What is Hexa's monthly production capacity?","Capacity depends on the product mix and shared fabrication, welding, material handling and coating constraints. A verified capacity figure will be published after approval rather than using an aspirational target."],
] as const;
