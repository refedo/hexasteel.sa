// Shared content: the product range and service narratives drive both the page and search.
export const structuralSteelScenes=[
{label:"Structural Systems",eyebrow:"01 / COMPLEX STRUCTURES",headline:"Steel structures built around the project.",description:"From industrial frames and heavy structures to pipe racks, process platforms and complex custom steelwork, we manufacture around approved engineering requirements.",outcomes:["Industrial and commercial structures","Pipe racks, platforms and structural assemblies","Complex connection and installation interfaces"],href:"/projects",cta:"Explore project experience",symbol:"STEEL"},
{label:"Engineering",eyebrow:"02 / ENGINEERING DISCIPLINE",headline:"Every tonne begins with engineering.",description:"Our engineering and detailing workflows align buildability, shop drawings, bill of materials, fabrication releases and revisions.",outcomes:["Design and connection coordination","Fabrication-ready 3D detailing deliverables","Planning and technical query management"],href:"/project-delivery",cta:"View delivery methodology",symbol:"BIM"},
{label:"Manufacturing",eyebrow:"03 / FABRICATION & QUALITY",headline:"Precision through controlled production.",description:"Cutting, assembly, welding, inspections, surface protection and dispatch are connected by production planning and quality controls.",outcomes:["CNC cutting and fabricated assemblies","WPS/PQR, ITP and material traceability","Quality documentation and planned dispatch"],href:"/capabilities/quality",cta:"Explore our quality controls",symbol:"QC"},
{label:"Site Execution",eyebrow:"04 / PROJECT EXECUTION",headline:"The factory and site are one program.",description:"Site delivery requires planned method statements, lifting plans, survey coordination, installation interfaces, alignment and controlled handover.",outcomes:["Site coordination and supervision","Certified lifting resources and logistics planning","Subcontracted erection management where contracted"],href:"/project-delivery",cta:"Explore site capabilities",symbol:"SITE"},
];
export const structuralSteelProducts=[
  {
    "title": "Truss systems",
    "description": "Roof trusses, industrial long-span trusses and specialty steel assemblies."
  },
  {
    "title": "Mezzanine structures",
    "description": "Multi-level steel framing for storage, access and production areas."
  },
  {
    "title": "Industrial platforms",
    "description": "Equipment supports, access platforms, service frames and pipe racks."
  },
  {
    "title": "Silos and towers",
    "description": "Steel storage structures and industrial tower frames."
  },
  {
    "title": "Multi-storey steel buildings",
    "description": "Multi-level framed commercial and industrial developments."
  },
  {
    "title": "Poultry farm structures",
    "description": "Steel buildings for agricultural and poultry operations."
  },
  {
    "title": "Complex-shape structures",
    "description": "Custom engineered geometry and non-standard fabricated members."
  },
  {
    "title": "Warehouses and hangars",
    "description": "Industrial warehouses, maintenance hangars and logistics facilities."
  }
] as const;
// Search terminology: aliases only, not additional commercial capability claims.
export const structuralSteelSearchAliases=[
 "metal works","metalwork","steel metal works","structural metal works","metal fabrication",
 "mezzanine","mezzanine floor","mezzanine floors","poultry farms","poultry houses",
 "steel trusses","industrial platforms","silos","towers","steel stairs","industrial buildings"
] as const;
export const structuralSteelSearchCorpus=[
 ...structuralSteelScenes.flatMap(s=>[s.label,s.headline,s.description,...s.outcomes]),
 ...structuralSteelProducts.flatMap(p=>[p.title,p.description]),
 ...structuralSteelSearchAliases
].join(" ");
