import {defineType,defineField} from 'sanity';
const text=(name:string,title:string,group:string,required=false)=>defineField({name,title,group,type:'text',rows:4,validation:r=>required?r.required().max(6000):r.max(6000)});
export const jobPosting=defineType({
 name:'jobPosting',title:'Career Opportunity',type:'document',
 description:'Public vacancy information only. Never store applicants, CVs, salaries of employees or internal hiring notes here. Publish after editing; publish a Closed status to stop applications.',
 groups:[{name:'vacancy',title:'Vacancy & Status',default:true},{name:'description',title:'Job Description'},{name:'requirements',title:'Requirements & Package'}],
 fields:[
  defineField({name:'title',title:'Job title',type:'string',group:'vacancy',validation:r=>r.required().max(120)}),
  defineField({name:'code',title:'Unique vacancy reference',description:'Permanent reference, e.g. HX-CAR-006. Do not reuse references.',type:'string',group:'vacancy',validation:r=>r.required().regex(/^[A-Z0-9-]{3,30}$/).custom(async(value,context)=>{
   if(!value)return true;
   const id=context.document?._id.replace(/^drafts\./,'');
   const count=await context.getClient({apiVersion:'2025-02-01'}).fetch<number>('count(*[_type=="jobPosting" && code==$code && !(_id in [$id,$draft])])',{code:value,id:id||'',draft:'drafts.'+id},{perspective:'raw',useCdn:false});
   return count===0||'This vacancy reference is already used.';
  })}),
  defineField({name:'status',type:'string',group:'vacancy',initialValue:'draft',options:{list:[{title:'Draft — hidden',value:'draft'},{title:'Open — accepting applications',value:'open'},{title:'On hold — applications paused',value:'onHold'},{title:'Closed — applications stopped',value:'closed'}]},validation:r=>r.required()}),
  defineField({name:'approvedForWeb',title:'Approved for public website',type:'boolean',group:'vacancy',initialValue:false}),
  defineField({name:'team',title:'Department / team',type:'string',group:'vacancy',validation:r=>r.required().max(120)}),
  defineField({name:'location',type:'string',group:'vacancy',initialValue:'Riyadh, Saudi Arabia',validation:r=>r.required().max(160)}),
  defineField({name:'employmentType',type:'string',group:'vacancy',initialValue:'Full-time',options:{list:['Full-time','Part-time','Contract','Temporary','Internship']},validation:r=>r.required()}),
  defineField({name:'workplace',title:'Work arrangement',type:'string',group:'vacancy',initialValue:'On-site',options:{list:['On-site','Hybrid','Remote']},validation:r=>r.required()}),
  defineField({name:'openings',title:'Number of openings',type:'number',group:'vacancy',initialValue:1,validation:r=>r.required().integer().min(1).max(1000)}),
  defineField({name:'opensAt',title:'Opening date and time',type:'datetime',group:'vacancy',description:'Optional. Vacancy stays hidden until this time.'}),
  defineField({name:'closesAt',title:'Application deadline',type:'datetime',group:'vacancy',description:'Optional. Applications stop automatically at this time.',validation:r=>r.custom((value,ctx)=>!value||!ctx.document?.opensAt||Date.parse(String(value))>Date.parse(String(ctx.document.opensAt))||'Deadline must follow opening time.')}),
  text('overview','Role summary','description',true),
  text('responsibilities','Key responsibilities','description',true),
  text('qualifications','Education & qualifications','requirements',true),
  text('skills','Technical skills & competencies','requirements',true),
  defineField({name:'minExperience',title:'Minimum relevant experience (years)',type:'number',group:'requirements',validation:r=>r.required().integer().min(0).max(50)}),
  defineField({name:'maxExperience',title:'Preferred upper experience (years)',type:'number',group:'requirements',description:'Display guidance, not an automatic rejection criterion.',validation:r=>r.integer().min(0).max(50).custom((v,c)=>v==null||v>=Number(c.document?.minExperience||0)||'Must be at least the minimum experience.')}),
  text('certifications','Required / preferred certifications','requirements'),text('languages','Language requirements','requirements'),
  text('benefits','Benefits & development opportunities','requirements'),
  defineField({name:'salaryDisplay',title:'Public salary / package (optional)',type:'string',group:'requirements',description:'Only enter an approved range intended for public display.',validation:r=>r.max(160)}),
  text('applicationInstructions','Additional application instructions','description')
 ],
 orderings:[{title:'Status, then job title',name:'statusTitle',by:[{field:'status',direction:'asc'},{field:'title',direction:'asc'}]}],
 preview:{select:{title:'title',status:'status',code:'code'},prepare:({title,status,code})=>({title,subtitle:`${code||'No reference'} · ${status||'draft'}`})}
});
