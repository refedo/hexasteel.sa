import {createClient} from "next-sanity";

/**
 * Public measurement IDs are editable in the Sanity Studio singleton.
 * Never accept executable snippets or third-party URLs from the CMS.
 */
export const DEFAULT_GTM_ID="GTM-N7QJSQTB";
export const DEFAULT_GA4_ID="G-JG2HQGQ2P3";

export const GTM_ID_PATTERN=/^GTM-[A-Z0-9]{5,12}$/;
export const GA4_ID_PATTERN=/^G-[A-Z0-9]{6,16}$/;
export type AnalyticsSettings={
 gtmContainerId:string;
 ga4MeasurementId:string;
 ga4Source:"gtm"|"direct";
 directGa4Enabled:boolean;
};
type CmsAnalytics={
 gtmContainerId?:unknown;
 ga4MeasurementId?:unknown;
 ga4Source?:unknown;
 directGa4Confirmed?:unknown;
};

function validatedId(value:unknown,pattern:RegExp,fallback:string):string {
 if(typeof value!=="string")return fallback;
 const candidate=value.trim();
 return pattern.test(candidate)?candidate:fallback;
}

/** Only valid public identifiers and pre-approved loading modes reach the browser. */
export function normalizeAnalyticsSettings(value:CmsAnalytics|null|undefined):AnalyticsSettings {
 const gtmContainerId=validatedId(value?.gtmContainerId,GTM_ID_PATTERN,DEFAULT_GTM_ID);
 const ga4MeasurementId=validatedId(value?.ga4MeasurementId,GA4_ID_PATTERN,DEFAULT_GA4_ID);
 const directGa4Enabled=value?.ga4Source==="direct"&&value?.directGa4Confirmed===true;
 return {
  gtmContainerId,ga4MeasurementId,
  ga4Source:directGa4Enabled?"direct":"gtm",
  directGa4Enabled
 };
}

export async function getAnalyticsSettings():Promise<AnalyticsSettings>{
 const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||"ik7morln";
 const dataset=process.env.NEXT_PUBLIC_SANITY_DATASET||"production";
 try {
  const client=createClient({projectId,dataset,apiVersion:"2025-02-01",useCdn:true});
  const raw=await client.fetch<CmsAnalytics|null>(
   '*[_type=="analyticsSettings" && _id=="analyticsSettings"][0]{gtmContainerId,ga4MeasurementId,ga4Source,directGa4Confirmed}',
   {},{next:{revalidate:30}}
  );
  return normalizeAnalyticsSettings(raw);
 } catch {
  // Preserve existing GTM/GA4 instrumentation during a CMS outage.
  return normalizeAnalyticsSettings(null);
 }
}
