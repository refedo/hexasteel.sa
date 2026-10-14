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
const project=defineType({name:"project",title:"Public Project Case Study",type:"document",
 description:"PUBLIC DATASET: never enter confidential client names, customer references or restricted documents. Use anonymous identifiers only.",
 fields:[
  defineField({name:"publicTitle",type:"localizedText",title:"Anonymous Project Title",description:"No customer names or restricted project identifiers.",validation:r=>r.required()}),
  defineField({name:"publicSlug",type:"slug",title:"Anonymous URL",options:{source:"publicTitle.en"},validation:r=>r.required()}),
  defineField({name:"sector",type:"string",title:"Sector"}),
  defineField({name:"publicSummary",type:"text",title:"Public Scope Summary",rows:4,validation:r=>r.required()}),
  defineField({name:"quantityDisplay",type:"string",title:"Approved Tonnage"}),
  defineField({name:"deliveryStatus",type:"string",title:"Delivery Status",options:{list:["Completed","Ongoing","Status to confirm"]},initialValue:"Status to confirm",validation:r=>r.required()}),
  defineField({name:"coverImage",type:"image",options:{hotspot:true},description:"Approved project image, no confidential client identification."}),
  defineField({name:"completionYear",type:"number"}),
  defineField({name:"scope",type:"text",title:"Public Scope Details"}),
  defineField({name:"photos",type:"array",of:[{type:"image",options:{hotspot:true}}]}),
  defineField({name:"approvedForWeb",type:"boolean",initialValue:false,description:"Management reviewed all facts, photos and figures."}),
  defineField({name:"identityClearedForWeb",type:"boolean",initialValue:false,description:"Confirmed title, slug, imagery and copy contain no restricted identities."})
 ],
 preview:{select:{title:"publicTitle.en",subtitle:"deliveryStatus"}}
});
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

const siteSettings=defineType({
  name:"siteSettings",title:"Brand & Website Settings",type:"document",
  fields:[
    defineField({name:"accentColor",title:"Industrial Accent Color",description:"Select an approved visual accent; primary HEXA navy #2C3E50 remains unchanged.",type:"string",initialValue:"#C6D547",
      options:{list:[
        {title:"Signal Lime / Current",value:"#C6D547"},
        {title:"Brushed Brass",value:"#D7B36B"},
        {title:"Steel Blue",value:"#94B2C3"},
        {title:"Concrete Silver",value:"#CDD3D8"},
        {title:"Copper",value:"#C89372"}
      ]},validation:r=>r.required()}),
    defineField({name:"headerTagline",type:"localizedText",title:"Header Tagline"}),
    defineField({name:"heroHeadline",type:"localizedText",title:"Homepage Headline"}),
    defineField({name:"heroDescription",type:"localizedText",title:"Homepage Hero Description"}),
    defineField({name:"marketPositioning",type:"localizedText",title:"Homepage Market Positioning",description:"Management-approved corporate positioning."}),
 defineField({name:"ambition",type:"localizedText",title:"Legacy Ambition Statement",hidden:true}),
 defineField({name:"trustIndicators",type:"array",title:"Homepage Trust Indicators",of:[{type:"object",fields:[
  defineField({name:"figure",type:"string",title:"Figure",validation:r=>r.required()}),
  defineField({name:"unit",type:"string",title:"Description Label",validation:r=>r.required()}),
  defineField({name:"description",type:"string",title:"Explanation"}),
  defineField({name:"symbol",type:"string",title:"Index / Symbol"}),
  defineField({name:"approvedForWeb",type:"boolean",initialValue:false,description:"Evidence checked and release approved."})
 ]}]}),
    defineField({name:"heroSlides",type:"array",title:"Homepage Hero Images",description:"Upload genuine HEXA Steel® factory or project photos with permission. Max six.",
       validation:r=>r.max(6),of:[{type:"object",fields:[
        defineField({name:"asset",type:"image",options:{hotspot:true},validation:r=>r.required()}),
        defineField({name:"title",type:"string",validation:r=>r.required()}),
        defineField({name:"alt",type:"string",title:"Accessible image description",validation:r=>r.required()}),
        defineField({name:"credit",type:"string"})
       ]}]}),
    defineField({name:"contactMobile",type:"string",title:"Public Mobile / WhatsApp Number",description:"Public number in international E.164 format, e.g. +966591716020. Changing this updates Contact, footer and WhatsApp buttons.",initialValue:"+966591716020",validation:r=>r.regex(/^\+[1-9][0-9]{7,14}$/,{name:"international phone number"})}),
    defineField({name:"whatsappEnabled",type:"boolean",title:"Show WhatsApp Chat",initialValue:true}),
    defineField({name:"contactNotificationEmail",type:"string",hidden:true,description:"Not connected until secure transactional forms are implemented."})
  ],
  preview:{prepare:()=>({title:"HEXA Website Theme & Settings"})}
});
const testimonial=defineType({
  name:"testimonial",title:"Client Testimonial",type:"document",
  fields:[
    defineField({name:"quote",type:"text",rows:4,validation:r=>r.required()}),
    defineField({name:"client",type:"string",validation:r=>r.required()}),
    defineField({name:"person",type:"string"}),
    defineField({name:"role",type:"string"}),
    defineField({name:"publicationPermission",type:"boolean",initialValue:false}),
    defineField({name:"isFeatured",type:"boolean",initialValue:false})
  ]
});
const teamProfile=defineType({
  name:"teamProfile",title:"Team & Leadership Profile",type:"document",
  fields:[
    defineField({name:"name",type:"string",validation:r=>r.required()}),
    defineField({name:"role",type:"localizedText"}),
    defineField({name:"department",type:"string"}),
    defineField({name:"photo",type:"image",options:{hotspot:true}}),
    defineField({name:"bio",type:"text"}),
    defineField({name:"consentToPublish",type:"boolean",initialValue:false})
  ]
});


const knowledgeArticle=defineType({name:"knowledgeArticle",title:"Knowledge Centre — Articles",type:"document",fields:[
 defineField({name:"title",type:"localizedText",validation:r=>r.required()}),
 defineField({name:"slug",type:"slug",options:{source:"title.en"},validation:r=>r.required()}),
 defineField({name:"category",type:"string",validation:r=>r.required()}),
 defineField({name:"intro",type:"localizedText",validation:r=>r.required()}),
 defineField({name:"sections",type:"array",of:[{type:"object",fields:[
  defineField({name:"heading",type:"localizedText",validation:r=>r.required()}),
  defineField({name:"body",type:"localizedText",validation:r=>r.required()})
 ]}]}),
 defineField({name:"coverImage",type:"image",options:{hotspot:true}}),
 defineField({name:"approvedForWeb",type:"boolean",initialValue:false,description:"Visible only once public publication approved."}),
 defineField({name:"seoDescription",type:"text",rows:3})
]});
const companyUpdate=defineType({name:"companyUpdate",title:"News / Insights / Initiatives",type:"document",fields:[
 defineField({name:"title",type:"localizedText",validation:r=>r.required()}),
 defineField({name:"slug",type:"slug",options:{source:"title.en"},validation:r=>r.required()}),
 defineField({name:"category",type:"string",options:{list:["Strategic Initiative","Industry Engagement","Operational Excellence","Manufacturing Qualification","Industrial Growth"]},validation:r=>r.required()}),
 defineField({name:"displayDate",type:"string",title:"Display date",validation:r=>r.required()}),
 defineField({name:"summary",type:"localizedText",validation:r=>r.required()}),
 defineField({name:"sections",type:"array",of:[{type:"object",fields:[
  defineField({name:"heading",type:"localizedText",validation:r=>r.required()}),
  defineField({name:"body",type:"localizedText",validation:r=>r.required()})
 ]}]}),
 defineField({name:"coverImage",type:"image",options:{hotspot:true}}),
 defineField({name:"approvedForWeb",type:"boolean",initialValue:false}),
 defineField({name:"seoDescription",type:"text",rows:3})
]});
const capabilityService=defineType({name:"capabilityService",title:"Public Manufacturing Service",type:"document",fields:[
 defineField({name:"title",type:"localizedText",validation:r=>r.required()}),
 defineField({name:"description",type:"localizedText",validation:r=>r.required()}),
 defineField({name:"serviceArea",type:"string",options:{list:["Cutting","Fabrication","Built-up Sections","Purlins","Coating"]}}),
 defineField({name:"publicImage",type:"image",options:{hotspot:true}}),
 defineField({name:"approvedForWeb",type:"boolean",initialValue:false})
],description:"Customer-facing capability only. Do not store confidential supplier quotes, machine models or internal production recipes here."});

const publicQualification=defineType({name:"publicQualification",title:"Public Qualification / Approval",type:"document",fields:[
 defineField({name:"name",type:"string",validation:r=>r.required()}),
 defineField({name:"category",type:"string",options:{list:["Manufacturer Approval","Supplier Registration","Prequalification","Accreditation","Certification","Other"]},validation:r=>r.required()}),
 defineField({name:"detail",type:"string",title:"Public Scope and Status",validation:r=>r.required()}),
 defineField({name:"logo",type:"image",title:"Official Organization Logo",options:{hotspot:false},description:"Upload a genuine, source-verified logo. Logos are not automatically published."}),
 defineField({name:"logoAlt",type:"string",title:"Logo alternative text",description:"e.g., Saudi Aramco logo"}),
 defineField({name:"logoUseAuthorized",type:"boolean",title:"Logo rights and publication clearance confirmed",initialValue:false,description:"Obtain permission or confirm applicable nominative use and brand guidelines. Never imply endorsement or an approval beyond the supported scope."}),
 defineField({name:"verifiedScope",type:"boolean",initialValue:false,description:"Scope and current status verified against official documentation."}),
 defineField({name:"approvedForWeb",type:"boolean",initialValue:false,description:"Cleared for public release."})
]});
export const schemaTypes=[localizedText,contentSection,page,project,credential,initiative,siteSettings,testimonial,teamProfile,knowledgeArticle,companyUpdate,capabilityService,publicQualification];
