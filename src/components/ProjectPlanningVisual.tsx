/** Illustrative Gantt process visualization, never actual customer project status. */
const tasks=[
 {stage:"ENGINEERING",label:"Design & approvals",start:3,end:27},
 {stage:"ENGINEERING",label:"Detailing & release",start:18,end:44},
 {stage:"OPERATIONS",label:"Material procurement",start:25,end:57},
 {stage:"OPERATIONS",label:"Fabrication",start:43,end:79},
 {stage:"OPERATIONS",label:"Coating & dispatch",start:72,end:91},
 {stage:"SITE",label:"Site coordination",start:84,end:98}
];
export function ProjectPlanningVisual(){
 return <section className="hexa-gantt-section" aria-labelledby="hexa-gantt-heading">
  <div className="shell hexa-gantt-layout">
   <div className="hexa-gantt-copy"><p className="eyebrow on-dark">PROJECT PLANNING / VISUAL CONTROLS</p><h2 id="hexa-gantt-heading">See the critical path. <span>Control every handoff.</span></h2><p>Integrated scheduling coordinates design release, material procurement, production, protective coating, dispatch and site readiness—rather than treating every activity as an isolated milestone.</p><small>Illustrative planning sequence — not live customer progress or a contractual schedule.</small></div>
   <div className="hexa-gantt" role="img" aria-label="Illustrative Gantt chart with overlapping design, detailing, procurement, fabrication, coating, delivery and site coordination activities across four planning periods.">
    <div className="hexa-gantt-axis"><span>WORK PACKAGE</span><span>PERIOD 01</span><span>02</span><span>03</span><span>04</span></div>
    <div className="hexa-gantt-rows">
    {tasks.map((task,i)=><div className="hexa-gantt-row" key={task.label}>
      <div className="hexa-gantt-label"><small>{task.stage}</small><strong>{task.label}</strong></div>
      <div className="hexa-gantt-grid"><div className="hexa-gantt-bar" style={{left:task.start+"%",width:(task.end-task.start)+"%",animationDelay:(i*.22)+"s"}}/><div className="hexa-gantt-line" aria-hidden="true"/></div>
    </div>)}
    </div>
    <div className="hexa-gantt-legend"><span><i/> Planned activity</span><span>Timeline illustrative · Work-package coordination</span></div>
   </div>
  </div>
 </section>;
}
