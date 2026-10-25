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
