import {NextResponse} from "next/server";
import {rankSearch,staticSearchIndex,type SearchResult} from "@/lib/searchIndex";
import {getCmsSearchEntries} from "@/lib/cms";
export const runtime="nodejs";
export async function GET(req:Request){
 const q=new URL(req.url).searchParams.get("q")?.slice(0,100).trim()||"";
 if(q.length<2)return NextResponse.json({results:[],query:q});
 const cms=await getCmsSearchEntries();
 const resultByHref=new Map<string,SearchResult>();
 for(const item of staticSearchIndex)resultByHref.set(item.href,item);
 for(const item of cms)resultByHref.set(item.href,item);
 return NextResponse.json({results:rankSearch(q,[...resultByHref.values()]),query:q},{headers:{"Cache-Control":"private, no-store"}});
}
