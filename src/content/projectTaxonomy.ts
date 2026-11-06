export const industrySectors = ["Industrial","Commercial","Oil & Gas","Utilities","Entertainment","Hospitality","Logistics","Other"] as const;
export const projectTypeOptions = ["Warehouse","Factory","Hotel","Entertainment Venue","Logistics Hub","Other"] as const;
export const steelSystemOptions = ["Steel Structure","Pre-Engineered Building (PEB)"] as const;
export type PublicProject={slug:string;title:string;category:string;description:string;status:string;image:string;year?:string;size?:string;industries?:string[];projectTypes?:string[];steelSystem?:string;scope?:string;gallery?:{src:string;alt:string}[]};
