"use client";
import {useCallback,useEffect,useState} from "react";
export type HeroSlide={src:string;alt:string;title:string;credit?:string};
const defaults:HeroSlide[]=[
  {src:"https://images.unsplash.com/photo-1748956628042-b73331e0b479?auto=format&fit=crop&w=1500&q=84",alt:"Steel-frame structure under construction with a tower crane",title:"STRUCTURAL STEEL / SITE EXECUTION",credit:"Illustrative photograph · Jaeman Jung / Unsplash"},
  {src:"https://images.unsplash.com/photo-1649587597799-4c227640f4f8?auto=format&fit=crop&w=1500&q=84",alt:"Large pre-engineered industrial steel building during erection",title:"PRE-ENGINEERED BUILDINGS / INDUSTRIAL",credit:"Illustrative photograph · David Griffiths / Unsplash"},
  {src:"https://images.unsplash.com/photo-1781156771445-404a80d7ee7a?auto=format&fit=crop&w=1500&q=84",alt:"Industrial steel facility interior showing steel roof framing and overhead crane",title:"MANUFACTURING / INDUSTRIAL STRUCTURES",credit:"Illustrative photograph · Declan Sun / Unsplash"},
];
export function HeroSlider({slides:provided}:{slides?:HeroSlide[]}){
 const slides=provided?.length?provided:defaults;
 const [active,setActive]=useState(0);
 const index=active%slides.length;
 const next=useCallback(()=>setActive(i=>(i+1)%slides.length),[slides.length]);
 const previous=useCallback(()=>setActive(i=>(i+slides.length-1)%slides.length),[slides.length]);
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");if(media.matches)return;const id=window.setInterval(next,6500);return()=>window.clearInterval(id)},[next]);
 return <div className="hero-slide-wrap" aria-roledescription="carousel" aria-label="Structural steel, PEB and manufacturing photography">
   <div className="hero-slides">{slides.map((slide,i)=><div key={slide.src} className={"hero-slide"+(i===index?" is-active":"")} aria-hidden={i!==index}>
      <div className="hero-slide-image" role="img" aria-label={slide.alt} style={{backgroundImage:'url("'+slide.src+'")'}}/><div className="hero-slide-overlay"/>
    </div>)}</div>
   <div className="hero-photo-label"><span>{slides[index].title}</span><small>{slides[index].credit||"HEXA STEEL® / PROJECT PHOTOGRAPHY"}</small></div>
   <div className="hero-slide-controls"><div className="hero-slide-dots" aria-label="Select image">{slides.map((slide,i)=><button type="button" key={slide.src} className={i===index?"active":""} aria-label={"Show slide "+(i+1)+": "+slide.title} aria-current={i===index?"true":undefined} onClick={()=>setActive(i)}/>)}</div>
    <div className="hero-slide-arrows"><button type="button" onClick={previous} aria-label="Previous hero image">←</button><button type="button" onClick={next} aria-label="Next hero image">→</button></div></div>
 </div>;
}
