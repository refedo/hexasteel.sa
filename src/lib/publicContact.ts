import {getHomeSettings} from "@/lib/cms";
const defaultNumber="+966591716020";
/** Public contact details. The fallback is intentionally visible, as authorized by Hexa management. */
export async function getPublicContact(){
 const settings=await getHomeSettings();
 const entered=(settings.contactMobile||"").replace(/[\s()-]/g,"");
 const number=/^\+[1-9]\d{7,14}$/.test(entered)?entered:defaultNumber;
 return {
  number,
  formatted:number==="+966591716020"?"+966 59 171 6020":number,
  tel:"tel:"+number,
  whatsapp:"https://wa.me/"+number.replace("+",""),
  whatsappEnabled:settings.whatsappEnabled!==false,
 };
}
