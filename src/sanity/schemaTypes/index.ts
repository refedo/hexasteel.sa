import {defineType,defineField} from "sanity";

const localizedText = defineType({
  name:"localizedText",title:"Localized Text",type:"object",
  fields:[defineField({name:"en",type:"string",title:"English",validation:r=>r.required()}),defineField({name:"ar",type:"string",title:"Arabic"})]
});
const contentSection = defineType({
  name:"contentSection",title:"Page Section",type:"object",
  fields:[
    defineField({name:"kind",type:"string",options:{list:["hero","textImage","capabilityGrid","projectHighlights","quality","timeline","values","statistics","cta","knowledge","testimonials"]},validation:r=>r.required()}),
    defineField({name:"heading",type:"localizedText"}),
    defineField({name:"description",type:"text",rows:4}),
    defineField({name:"image",type:"image",options:{hotspot:true}}),
    defineField({name:"hidden",type:"boolean",initialValue:false})
  ],
  preview:{select:{title:"heading.en",subtitle:"kind"}}
});
const page = defineType({
  name:"page",title:"Website Page",type:"document",
  fields:[
    defineField({name:"title",type:"localizedText",validation:r=>r.required()}),
    defineField({name:"slug",type:"slug",options:{source:"title.en"},validation:r=>r.required()}),
    defineField({name:"seoDescription",type:"localizedText"}),
    defineField({name:"sections",type:"array",of:[{type:"contentSection"}]})
  ],
  preview:{select:{title:"title.en"}}
});
const project=defineType({name:"project",title:"Project Case Study",type:"document",fields:[
  defineField({name:"title",type:"localizedText",validation:r=>r.required()}),
  defineField({name:"slug",type:"slug",options:{source:"title.en"}}),
  defineField({name:"sector",type:"string"}),
  defineField({name:"clientPermissionVerified",type:"boolean",initialValue:false}),
  defineField({name:"completionYear",type:"number"}),
  defineField({name:"scope",type:"text"}),
  defineField({name:"photos",type:"array",of:[{type:"image",options:{hotspot:true}}]})
]});
const machine=defineType({name:"machine",title:"Machine Capability",type:"document",fields:[
  defineField({name:"name",type:"string",validation:r=>r.required()}),
  defineField({name:"manufacturer",type:"string"}),
  defineField({name:"model",type:"string"}),
  defineField({name:"service",type:"string"}),
  defineField({name:"technicalSpecifications",type:"array",of:[{type:"object",fields:[{name:"label",type:"string"},{name:"value",type:"string"},{name:"verificationStatus",type:"string",options:{list:["Pending","Verified"]}}]}]}),
  defineField({name:"photos",type:"array",of:[{type:"image"}]})
]});
const article=defineType({name:"article",title:"Insights / Knowledge",type:"document",fields:[
  defineField({name:"title",type:"localizedText",validation:r=>r.required()}),
  defineField({name:"slug",type:"slug",options:{source:"title.en"}}),
  defineField({name:"category",type:"string",options:{list:["News","Milestones","Initiatives","Technical Guide","FAQ"]}}),
  defineField({name:"eventDate",type:"date"}),
  defineField({name:"publishedAt",type:"datetime"}),
  defineField({name:"summary",type:"text",rows:4}),
  defineField({name:"body",type:"array",of:[{type:"block"},{type:"image"}]}),
  defineField({name:"cover",type:"image",options:{hotspot:true}}),
  defineField({name:"verifiedForPublication",type:"boolean",initialValue:false})
]});
const credential=defineType({name:"credential",title:"Certifications & Approvals",type:"document",fields:[
  defineField({name:"name",type:"string",validation:r=>r.required()}),
  defineField({name:"type",type:"string",options:{list:["ISO Certification","Manufacturer Approval","Personnel Credential","Other"]}}),
  defineField({name:"scope",type:"text"}),
  defineField({name:"validUntil",type:"date"}),
  defineField({name:"verificationDocument",type:"file"}),
  defineField({name:"verified",type:"boolean",initialValue:false})
]});
const initiative=defineType({name:"initiative",title:"Strategic Initiative",type:"document",fields:[
  defineField({name:"name",type:"localizedText",validation:r=>r.required()}),
  defineField({name:"startDate",type:"date"}),
  defineField({name:"summary",type:"text"}),
  defineField({name:"currentStatus",type:"string",options:{list:["Planned","In progress","Completed"]}}),
  defineField({name:"gallery",type:"array",of:[{type:"image"}]})
]});
export const schemaTypes=[localizedText,contentSection,page,project,machine,article,credential,initiative];
