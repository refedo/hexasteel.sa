export const rfqServices=[
 {value:"structural-steel",label:"Structural Steel Fabrication"},
 {value:"peb",label:"Pre-Engineered Buildings (PEB)"},
 {value:"laser-cutting",label:"Precision Laser Cutting"},
 {value:"built-up-sections",label:"Built-Up Steel Sections"},
 {value:"cz-purlins",label:"C/Z Purlins & Girts"},
 {value:"steel-fabrication",label:"Custom Steel Fabrication"},
 {value:"design-detailing",label:"Structural Design & Detailing"},
 {value:"coating",label:"Coating & Fire Protection"},
 {value:"sheeting",label:"Sheeting & Cladding"},
 {value:"steel-accessories",label:"Industrial Steel Components"},
 {value:"pipes-vessels",label:"Mechanical Steel / Pipe Spools"},
 {value:"project-delivery",label:"Contractual Steel Project Delivery"},
 {value:"other",label:"Other Steel Service"}
] as const;
export type RfqService=(typeof rfqServices)[number]["value"];
export function validRfqService(value:string):value is RfqService{
 return rfqServices.some(item=>item.value===value);
}
export const maxFileSize=5*1024*1024; // bytes, per file
export const maxFiles=2;
export const maxUploadTotal=8*1024*1024; // combined uploaded bytes

/** Light-touch service-specific questions; all answers optional to keep conversion friction low. */
export const rfqServiceDetails:Record<RfqService,{first:string;firstHint:string;second:string;secondHint:string;guidance:string}>={
 "structural-steel":{first:"Estimated steel tonnage",firstHint:"e.g. 120 tonnes",second:"Drawing / design stage",secondHint:"Concept, IFC, or shop drawings",guidance:"Describe structure type, material grades, site and fabrication or erection scope."},
 "peb":{first:"Building dimensions (L × W × H)",firstHint:"e.g. 60 × 30 × 9 m",second:"Crane / load requirements",secondHint:"e.g. 5T crane, roof loads",guidance:"Provide clear span, bay spacing, ridge height, roof slope, cladding and wind criteria if available."},
 "laser-cutting":{first:"Plate material / grade",firstHint:"e.g. S355 / ASTM A36",second:"Plate thickness",secondHint:"e.g. 12 mm",guidance:"Include material, thickness, quantity, cutting tolerances and DXF/DWG files where permitted."},
 "built-up-sections":{first:"Section / member dimensions",firstHint:"e.g. built-up I 900 × 300",second:"Steel grade / total weight",secondHint:"e.g. S355, 40 tonnes",guidance:"Include web/flange details, lengths, weld requirements and approved drawings."},
 "cz-purlins":{first:"Profile / gauge",firstHint:"e.g. Z200 × 2.5 mm",second:"Number / member lengths",secondHint:"e.g. 250 × 6 m",guidance:"Specify C or Z, profile depth, thickness, spans, punch patterns and quantities."},
 "steel-fabrication":{first:"Fabrication type",firstHint:"e.g. platforms, beams, assemblies",second:"Steel grade / tonnage",secondHint:"e.g. S275, 75 tonnes",guidance:"Include fabrication drawings, required tolerances, welding and coating specifications."},
 "design-detailing":{first:"Engineering deliverables",firstHint:"e.g. calculations + shop drawings",second:"Design stage / standards",secondHint:"e.g. concept / AISC",guidance:"Describe the structure, applicable codes and required model or drawing deliverables."},
 "coating":{first:"Protection system / exposure",firstHint:"e.g. C4 epoxy / galvanization",second:"Surface area / steel tonnage",secondHint:"e.g. 2,000 m²",guidance:"Specify exposure category, coating system, DFT, surface prep and fire-rating requirements."},
 "sheeting":{first:"Panel / sheet specification",firstHint:"e.g. insulated roof panel",second:"Covered area",secondHint:"e.g. 3,500 m²",guidance:"Provide panel type, thickness, colors, accessories and insulation requirements."},
 "steel-accessories":{first:"Component type",firstHint:"e.g. base plates / bolts",second:"Sizes / quantity",secondHint:"e.g. M24 × 400, 200 pcs",guidance:"Include material, geometry, finish and tolerances where relevant."},
 "pipes-vessels":{first:"Equipment / spool type",firstHint:"e.g. pipe spools / tank",second:"Design code / material",secondHint:"e.g. ASME / CS",guidance:"Provide code, dimensions, pressure duty where applicable, inspection and testing requirements."},
 "project-delivery":{first:"Project / building type",firstHint:"e.g. factory steel package",second:"Target schedule",secondHint:"e.g. erection by Q2 2027",guidance:"Clarify which activities are needed: design, detailing, supply, production, coating, delivery, erection."},
 "other":{first:"Product / service details",firstHint:"Describe the item",second:"Key technical requirement",secondHint:"Sizes, steel grade or standard",guidance:"Describe what is needed and any critical project constraints."}
};
