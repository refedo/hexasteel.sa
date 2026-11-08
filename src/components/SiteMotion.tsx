"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

/** Progressive visual enhancement. No hidden content without JS or for reduced-motion visitors. */
export function SiteMotion(){
 const path=usePathname();
 useEffect(()=>{
  if(path.startsWith("/studio")||!window.IntersectionObserver||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const selector="main .section, main .project-showcase-card, main .editorial-card, main .editorial-feature, main .roadmap-page-section, main .hexa-gantt-section";
  const nodes=Array.from(document.querySelectorAll<HTMLElement>(selector));
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){entry.target.classList.add("hexa-is-visible");observer.unobserve(entry.target);}
   }
  },{rootMargin:"0px 0px -35px 0px",threshold:0.04});
  nodes.forEach(node=>{
   if(node.getBoundingClientRect().top<window.innerHeight*.9){node.classList.add("hexa-is-visible");return;}
   node.classList.add("hexa-reveal-prepare");
   observer.observe(node);
  });
  return()=>{observer.disconnect();nodes.forEach(node=>node.classList.remove("hexa-reveal-prepare","hexa-is-visible"));};
 },[path]);
 return null;
}
