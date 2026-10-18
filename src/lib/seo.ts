import type {Metadata} from "next";

/** Canonical official domain. Never build public search URLs from the request Host. */
export const siteOrigin="https://hexasteel.sa";

export function publicPageMetadata(path:string,title:string,description:string,image?:string):Metadata{
 if(!path.startsWith("/")||path.startsWith("//")||path.includes("?")||path.includes("#"))throw Error("Invalid canonical path");
 const canonical=new URL(path,siteOrigin).toString();
 return {
  title,description,alternates:{canonical},
  openGraph:{type:"website",siteName:"HEXA Steel®",locale:"en_SA",url:canonical,title,description,...(image?{images:[{url:image}]}:{})},
  twitter:{card:image?"summary_large_image":"summary",title,description,...(image?{images:[image]}:{})}
 };
}
