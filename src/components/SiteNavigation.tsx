"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {navigation} from "@/content/site";
export function SiteNavigation(){
 const [open,setOpen]=useState<string|null>(null);
 const [mobile,setMobile]=useState(false);
 const [sub,setSub]=useState<string|null>(null);
 const ref=useRef<HTMLDivElement>(null);
 const path=usePathname();
 useEffect(()=>{setOpen(null);setMobile(false);setSub(null)},[path]);
 useEffect(()=>{
  const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(null);setMobile(false)}};
  const outside=(e:PointerEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node)){setOpen(null);setMobile(false)}};
  window.addEventListener("keydown",escape);document.addEventListener("pointerdown",outside);
  return()=>{window.removeEventListener("keydown",escape);document.removeEventListener("pointerdown",outside)};
 },[]);
 useEffect(()=>{if(!mobile)return;const old=document.body.style.overflow;document.body.style.overflow="hidden";return()=>{document.body.style.overflow=old}},[mobile]);
 const close=()=>{setOpen(null);setMobile(false);setSub(null)};
 return <div className="hexa-nav-root" ref={ref}>
  <nav className="hexa-nav-desktop" aria-label="Main navigation">
  {navigation.map(item=><div key={item.href} className="hexa-nav-item" onMouseEnter={()=>setOpen(item.href)} onMouseLeave={()=>setOpen(null)}>
    {"children" in item && item.children?
    <><button type="button" className="hexa-nav-trigger" aria-haspopup="true" aria-expanded={open===item.href} onClick={()=>setOpen(v=>v===item.href?null:item.href)}>{item.label}<span aria-hidden="true" className="hexa-chevron"/></button>
    {open===item.href&&<div className="hexa-nav-submenu">
      <Link href={item.href} onClick={close} className="hexa-nav-overview">{item.label} overview</Link>
      {item.children.map(child=><Link href={child.href} key={child.href} onClick={close}>{child.label}</Link>)}
    </div>}</>:
    <Link className="hexa-nav-trigger" href={item.href} onClick={close}>{item.label}</Link>}
  </div>)}
  </nav>
  <button className={"hexa-nav-toggle"+(mobile?" open":"")} type="button" aria-expanded={mobile} aria-controls="hexa-nav-mobile-panel" aria-label={mobile?"Close menu":"Open menu"} onClick={()=>setMobile(v=>!v)}><span/><span/><span/></button>
  {mobile&&<><div className="hexa-nav-backdrop" onClick={close}/><nav className="hexa-nav-mobile" id="hexa-nav-mobile-panel" aria-label="Mobile navigation">
   <div className="hexa-nav-mobile-heading"><strong>HEXA STEEL®</strong><button type="button" onClick={close} aria-label="Close menu">Close</button></div>
   {navigation.map(item=><div className="hexa-nav-mobile-group" key={item.href}>
     {"children" in item && item.children?<><div className="hexa-nav-mobile-parent"><Link href={item.href} onClick={close}>{item.label}</Link><button type="button" aria-label={"Show "+item.label+" sections"} aria-expanded={sub===item.href} onClick={()=>setSub(v=>v===item.href?null:item.href)}>{sub===item.href?"−":"+"}</button></div>{sub===item.href&&<div className="hexa-nav-mobile-children">{item.children.map(child=><Link href={child.href} key={child.href} onClick={close}>{child.label}</Link>)}</div>}</>:
      <Link href={item.href} onClick={close} className="hexa-nav-mobile-direct">{item.label}</Link>}
   </div>)}
   <Link className="hexa-nav-mobile-direct" href="/search" onClick={close}>Search website</Link>
   <Link className="hexa-nav-mobile-rfq" href="/request-quotation" onClick={close}>Request a quotation</Link><a className="hexa-nav-mobile-direct" href="#project-tracking-preview" onClick={close}>Track Your Project — Coming Soon</a>
  </nav></>}
 </div>
}
