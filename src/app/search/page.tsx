import type {Metadata} from "next";
import Link from "next/link";
import {staticSearchIndex,rankSearch,type SearchResult} from "@/lib/searchIndex";
import {getCmsSearchEntries} from "@/lib/cms";
export const metadata:Metadata={title:"Search HEXA Steel"};
type Props={searchParams:Promise<{q?:string}>};
export default async function SearchPage({searchParams}:Props){
 const {q:raw}=await searchParams;const q=(raw||"").trim().slice(0,100);
 const byHref=new Map<string,SearchResult>();
 for(const item of staticSearchIndex)byHref.set(item.href,item);
 for(const item of await getCmsSearchEntries())byHref.set(item.href,item);
 const results=rankSearch(q,[...byHref.values()],50);
 return <main><section className="inner-hero"><div className="shell"><p className="eyebrow on-dark">DISCOVER HEXA / GLOBAL SEARCH</p><h1>Find what matters.</h1><p>Explore company information, structural steel solutions, project references, quality, knowledge and industrial milestones.</p></div></section>
   <section className="section"><div className="shell site-search-page"><form role="search" action="/search" method="get"><label htmlFor="q">Search the whole website</label><div className="site-search-page-input"><input id="q" type="search" name="q" defaultValue={q} placeholder="Try ITP, PEB, MODON, procurement…" minLength={2} maxLength={100}/><button type="submit">Search</button></div></form>
   {q.length>=2?<><p className="eyebrow">{results.length} RESULTS FOR “{q}”</p><div className="site-search-page-list">{results.map(x=><Link href={x.href} key={x.href}><span>{x.category}</span><strong>{x.title}</strong><small>{x.description}</small><b aria-hidden="true"></b></Link>)}{results.length===0&&<p>No exact matches. Try another keyword or visit the <Link href="/knowledge">Knowledge Centre</Link>.</p>}</div></>:<p className="search-page-hint">Type two or more characters to search site content.</p>}
   </div></section></main>
}
