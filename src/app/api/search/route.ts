import {NextResponse} from "next/server";
import {rankSearch,staticSearchIndex,mergeSearchEntries} from "@/lib/searchIndex";
import {getCmsSearchEntries} from "@/lib/cms";
export const runtime="nodejs";
export async function GET(req:Request){
 const q=new URL(req.url).searchParams.get("q")?.slice(0,100).trim()||"";
 if(q.length<2)return NextResponse.json({results:[],query:q});
 const cms=await getCmsSearchEntries();
 return NextResponse.json({results:rankSearch(q,mergeSearchEntries(staticSearchIndex,cms)),query:q},{headers:{"Cache-Control":"private, no-store"}});
}
