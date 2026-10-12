import {activityGroups} from "@/content/site";
export function DeliveryTimeline({compact=false}:{compact?:boolean}) {
 let index=0;
 return <div className={"delivery-timeline"+(compact?" compact":"")}>
   {activityGroups.map((group,i)=><section className="timeline-stage" key={group.stage}>
     <div className="timeline-stage-heading"><span className="timeline-stage-index">0{i+1}</span><div><h3>{group.stage}</h3><p>{group.summary}</p></div></div>
     <ol className="timeline-activities">{group.activities.map(activity=>{const k=++index;return <li key={activity.name} className="timeline-activity"><span className="timeline-number">{String(k).padStart(2,"0")}</span><div><strong>{activity.name}</strong>{!compact&&<p>{activity.description}</p>}</div></li>})}</ol>
   </section>)}
 </div>;
}
