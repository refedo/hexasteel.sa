import {createClient} from "next-sanity";
export const accentOptions = [
  {title:"Industrial Signal / Lime",value:"#C6D547"},
  {title:"Brushed Brass",value:"#D7B36B"},
  {title:"Steel Blue",value:"#94B2C3"},
  {title:"Concrete Silver",value:"#CDD3D8"},
  {title:"Copper",value:"#C89372"}
] as const;
const fallback="#C6D547";
export async function getAccentColor(): Promise<string> {
  const id=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
  if(!id)return fallback;
  try{
    const client=createClient({projectId:id,dataset,apiVersion:"2025-02-01",useCdn:true});
    const color=await client.fetch<string|null>('*[_type=="siteSettings" && _id=="siteSettings"][0].accentColor',{}, {next:{revalidate:120}});
    return accentOptions.some(option=>option.value===color)?color!:fallback;
  }catch{return fallback}
}
