import type {ReactNode} from "react";
type FrameKind="clear"|"multi"|"multiGable"|"lean"|"cantilever"|"curved"|"singleSlope"|"multiGable3";
const catalogue:{id:FrameKind;name:string;description:string}[]=[
{id:"clear",name:"Single-span / Clear-span",description:"One rigid portal frame without intermediate columns"},
{id:"multi",name:"Multi-span",description:"Wide spans with engineered intermediate column supports"},
{id:"multiGable",name:"Multi-gable",description:"Two pitched roof modules with an engineered valley"},
{id:"multiGable3",name:"Multi-gable / Triple",description:"Three coordinated roof modules for extensive industrial halls"},
{id:"lean",name:"Lean-to Extension",description:"Sloping extension attached to or adjacent to a main structure"},
{id:"singleSlope",name:"Single-slope",description:"Mono-pitch roof framed over a defined clear building width"},
{id:"cantilever",name:"Cantilever Canopy",description:"Outboard projection used for docks, shelter and circulation"},
{id:"curved",name:"Curved / Arched Roof",description:"Architectural curved roof line with purpose-designed structural geometry"}
];
const col="#2C3E50",accent="#B24D4D";
function FrameLines({id}:{id:FrameKind}):ReactNode{
const line={fill:"none",stroke:col,strokeWidth:6,strokeLinejoin:"round" as const,strokeLinecap:"round" as const};
const secondary={fill:"none",stroke:accent,strokeWidth:2.5,strokeDasharray:"6 5"};
switch(id){
 case"clear":return <><path {...line} d="M42 150 L42 68 L160 34 L278 68 L278 150"/><path {...secondary} d="M42 68 L160 34 L278 68"/></>;
 case"multi":return <><path {...line} d="M28 150 V73 L100 43 L160 67 L220 43 L292 73 V150 M160 67 V150"/></>;
 case"multiGable":return <><path {...line} d="M24 150 V73 L91 40 L158 73 L225 40 L294 73 V150 M158 73 V150"/></>;
 case"multiGable3":return <><path {...line} d="M18 150 V75 L65 45 L112 75 L160 45 L207 75 L254 45 L302 75 V150 M112 75 V150 M207 75 V150"/></>;
 case"lean":return <><path {...line} d="M110 150 V40 L250 70 V150 M110 85 L40 108 V150"/></>;
 case"singleSlope":return <path {...line} d="M42 150 V48 L280 85 V150"/>;
 case"cantilever":return <><path {...line} d="M100 150 V63 L244 70 M100 63 L32 77 M244 70 L290 94"/><path {...secondary} d="M100 63 L244 70"/></>;
 case"curved":return <path {...line} d="M38 150 V91 Q160 -10 282 91 V150"/>;
}}
export function PEBFrames({compact=false}:{compact?:boolean}){
return <div className={"frame-catalogue"+(compact?" compact":"")}>{catalogue.map((frame,i)=><article key={frame.id} className="frame-visual">
 <div className="frame-visual-svg"><svg role="img" aria-label={"Simplified structural diagram of "+frame.name} viewBox="0 0 320 190"><path d="M12 151H308" stroke="#95A9B7" strokeWidth="1.5"/><FrameLines id={frame.id}/></svg><span>PEB / {String(i+1).padStart(2,"0")}</span></div>
 <div className="frame-visual-copy"><h3>{frame.name}</h3><p>{frame.description}</p></div>
 </article>)}</div>;
}
