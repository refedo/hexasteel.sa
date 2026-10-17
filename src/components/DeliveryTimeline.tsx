import {activityGroups} from "@/content/site";
function StepIcon({id}:{id:number}){
const props={viewBox:"0 0 56 56",width:40,height:40,fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round" as const,strokeLinejoin:"round" as const,focusable:"false" as const,"aria-hidden":true as const};
const elements=[
  <><rect x="9" y="11" width="38" height="29" rx="1"/><path d="M9 19h38M21 40v6m14-6v6M17 33l10-9 13 8m-23 0 10 4 13-4M27 24v12"/></>,
  <><path d="M10 39V21l15-11 20 10v18L25 48 10 39Z"/><path d="M10 21l15 12 20-13M25 33v15M19 26l14-9M17 36l20 0"/></>,
  <><path d="M9 16h30l6 11v16H11L9 16Zm5 9h24M17 14V9h17M16 34h22M20 43v4m15-4v4"/><circle cx="21" cy="36" r="2"/><circle cx="36" cy="36" r="2"/></>,
  <><path d="M12 13h11v30H12m11-30 9 7-9 7m9-7v23h11V13M9 43h38M16 18h7M32 29h11"/></>,
  <><path d="M16 11v12l-7 7v8l14 7 14-7V29l-7-7V11H16Z"/><path d="M23 11v8m7 3 10-9M28 29c8 2 8 11 0 13"/><path d="M40 17h7m-6 6 5 4"/></>,
  <><path d="M8 18h28v21H8V18Zm28 8h8l5 8v5H36V26Z"/><circle cx="17" cy="41" r="5"/><circle cx="41" cy="41" r="5"/><path d="M12 24h17M12 29h17M12 34h13"/></>,
  <><path d="M14 46V12h27m-27 6 13 10m14-16-14 16m0 0v10"/><path d="M41 12v12m-4 7a4 4 0 0 0 8 0v-7M8 46h40M27 38l-9 8m9-8 9 8"/></>
];
return <svg {...props}>{elements[id]}</svg>
}
export function DeliveryTimeline({compact=false}:{compact?:boolean}) {
 let index=-1;
 return <div className={"hexa-roadmap"+(compact?" compact":"")}>
   <div className="roadmap-stages" aria-label="Three delivery stages">
    {activityGroups.map((group,i)=><div className={"roadmap-stage stage-"+i} key={group.stage}>
      <span className="roadmap-stage-no">0{i+1}</span><div className="roadmap-stage-title"><strong>{group.stage}</strong>{!compact&&<small>{group.summary}</small>}</div><span className="roadmap-chevron" aria-hidden="true">›</span>
    </div>)}
   </div>
   <div className="roadmap-scroll" role="region" aria-label="Seven linked project activities" tabIndex={0}>
     <ol className="roadmap-steps">
      {activityGroups.flatMap((group,g)=>group.activities.map(activity=>{
        index++;const n=index;
        return <li className={"roadmap-step step-stage-"+g} key={activity.name}>
          <div className="roadmap-connector" aria-hidden="true"/>
          <span className="roadmap-step-number">{n+1}</span>
          <div className="roadmap-disc"><StepIcon id={n}/></div>
          <strong>{activity.name}</strong>
          {!compact&&<p>{activity.description}</p>}
        </li>
      }))}
     </ol>
   </div>
   <p className="roadmap-note">Engineering <span>→</span> Operations <span>→</span> Site <i/> Every activity is a planned and controlled handoff.</p>
 </div>;
}
