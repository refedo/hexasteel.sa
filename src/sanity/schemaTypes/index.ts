import {contactFormSettings} from "./contactFormSettings";
import {jobPosting} from "./jobPosting";
import {defineType,defineField} from "sanity";
import {industrySectors,projectTypeOptions,steelSystemOptions} from "../../content/projectTaxonomy";

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
    defineField({name:"intro",type:"localizedText",title:"Page Introduction"}),
    defineField({name:"approvedForWeb",type:"boolean",title:"Approved for public website",initialValue:false}),
    defineField({name:"sections",type:"array",of:[{type:"contentSection"}]})
  ],
  preview:{select:{title:"title.en"}}
});
const project=defineType({name:"project",title:"Public Project Case Study",type:"document",
 description:"PUBLIC DATASET: named project references require verified publication permission. Never include confidential customer data, restricted identifiers or documents.",
 fields:[
  defineField({name:"publicTitle",type:"localizedText",title:"Public Project Title",description:"Customer and site names require documented publication rights; otherwise use anonymous titles.",validation:r=>r.required()}),
  defineField({name:"publicSlug",type:"slug",title:"Public Project URL",options:{source:"publicTitle.en"},validation:r=>r.required()}),
  defineField({name:"sector",type:"string",title:"Legacy Service Category",description:"Retained for existing projects. Use Industry and Project Type for new projects."}),
  defineField({name:"industries",type:"array",title:"Industry Sectors",description:"Select multiple when relevant, e.g. Entertainment and Utilities.",of:[{type:"string"}],options:{list:industrySectors.map(value=>({title:value,value}))}}),
  defineField({name:"projectTypes",type:"array",title:"Project Types",description:"Tag every warehouse as Warehouse, regardless of industry.",of:[{type:"string"}],options:{list:projectTypeOptions.map(value=>({title:value,value}))}}),
  defineField({name:"steelSystem",type:"string",title:"Steel Structure System",description:"Use Steel Structure instead of SS; leave blank when unverified.",options:{list:steelSystemOptions.map(value=>({title:value,value}))}}),
  defineField({name:"publicSummary",type:"text",title:"Public Scope Summary",rows:4,validation:r=>r.required()}),
  defineField({name:"quantityDisplay",type:"string",title:"Approved Tonnage"}),
  defineField({name:"deliveryStatus",type:"string",title:"Delivery Status",options:{list:["Completed","Ongoing","Status to confirm"]},initialValue:"Status to confirm",validation:r=>r.required()}),
  defineField({name:"coverImage",title:"Project Cover — 16:9",type:"image",options:{hotspot:true},description:"Recommended: landscape 1920×1080 px or larger (minimum 1600×900), JPEG/WebP/PNG, sRGB, ideally under 5 MB. Upload an authorized genuine project image. Avoid screenshots, logos, text overlays or confidential visuals."}),
  defineField({name:"illustrativeUrl",type:"url",title:"Previous illustrative card image",readOnly:true,description:"External illustrative photograph shown until an approved HEXA photo is uploaded. This is not a verified project image."}),
  defineField({name:"completionYear",type:"number"}),
  defineField({name:"scope",type:"text",title:"Public Scope Details"}),
  defineField({name:"photos",title:"Approved Project Gallery",description:"Upload clear, authentic project photographs; landscape 1600×900 px or larger recommended, portrait at least 1200×1600. JPEG/WebP/PNG, sRGB, preferably under 5 MB each. Avoid duplicates, client-sensitive signs, drawings and confidential material. The public site adds the HEXA watermark.",type:"array",of:[{type:"image",options:{hotspot:true},fields:[{name:"alt",type:"string",title:"Image description / accessibility",description:"Describe what the photo depicts (e.g. fabricated roof trusses in factory). Avoid confidential site or customer identification.",validation:r=>r.required().max(160)}]}]}),
  defineField({name:"approvedForWeb",type:"boolean",initialValue:false,description:"Management reviewed all facts, photos and figures."}),
  defineField({name:"identityClearedForWeb",type:"boolean",initialValue:false,description:"Documented permission obtained for customer/site names in the title, URL, copy or imagery, or record fully anonymized."})
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
    defineField({name:"favicon",title:"Website favicon",type:"image",description:"Upload a square PNG, ideally 512 × 512 px. Publish to update browser tab and bookmark icons; browsers may cache the previous icon.",options:{accept:"image/png",hotspot:false},validation:r=>r.custom(value=>{const ref=(value as {asset?:{_ref?:string}}|undefined)?.asset?._ref;if(!ref)return true;const match=ref.match(/-(\d+)x(\d+)-png$/);return match&&match[1]===match[2]&&Number(match[1])>=64?true:"Use a square PNG of at least 64 × 64 px.";})}),
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
    defineField({name:"heroSlides",type:"array",title:"Homepage Hero Images",description:"Use genuine landscape imagery at 1920×1080 px or larger, 16:9, JPEG/WebP, sRGB, preferably under 5 MB. Keep focal subject away from text placement. Up to six slides. Existing Unsplash images remain illustrative until replaced.",
       validation:r=>r.max(6),of:[{type:"object",fields:[
        defineField({name:"asset",type:"image",options:{hotspot:true},description:"Recommended 1920×1080 px, 16:9 wide composition, JPEG/WebP, ideally <5 MB; photograph must be cleared for public use. Set focal point using hotspot."}),
        defineField({name:"illustrativeUrl",type:"url",title:"Existing illustrative photo URL",description:"Legacy Unsplash references only, until replaced by an approved HEXA upload.",validation:r=>r.custom(value=>!value||/^https:\/\/images\.unsplash\.com\/photo-[a-z0-9-]+/.test(value)?true:"Only the existing Unsplash illustration host is allowed.")}),
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
/**
 * Single editable public ID configuration — IDs are not credentials.
 * No arbitrary JS, snippets, HTML, API keys or write tokens belong here.
 */
const analyticsSettings=defineType({
 name:"analyticsSettings",title:"Website Analytics & Tag Manager",type:"document",
 description:"Edit website GTM and GA4 IDs here, then Publish. Changes normally reach fresh website loads within about 30 seconds.",
 fields:[
  defineField({name:"gtmContainerId",title:"Google Tag Manager Container ID",type:"string",initialValue:"GTM-N7QJSQTB",
   description:"Format: GTM-XXXXXXXX. Publishing a new value updates the website's GTM loader. This is the container ID, not an HTML script.",
   validation:r=>r.required().regex(/^GTM-[A-Z0-9]{5,12}$/,{name:"GTM container ID"}).error("Use the GTM-XXXXXXXX format, with capital letters and numbers.")}),
  defineField({name:"ga4MeasurementId",title:"Google Analytics 4 Measurement ID",type:"string",initialValue:"G-JG2HQGQ2P3",
   description:"Format: G-XXXXXXXX. For GTM-managed GA4, this value is exposed to the data layer as hexa_ga4_measurement_id. Configure the GTM Google tag to use that variable once; otherwise its separately stored ID will not change.",
   validation:r=>r.required().regex(/^G-[A-Z0-9]{6,16}$/,{name:"GA4 measurement ID"}).error("Use the G-XXXXXXXX format, with capital letters and numbers.")}),
  defineField({name:"ga4Source",title:"Where GA4 is loaded",type:"string",initialValue:"gtm",options:{layout:"radio",list:[
    {title:"Google Tag Manager — current setup (recommended)",value:"gtm"},
    {title:"Directly from this website — only if GA4 tag is disabled in GTM",value:"direct"}
   ]},description:"Keep GTM-managed unless you have disabled GA4 page-view tags inside GTM. Do not run both GA4 tags or visits will be counted twice.",
   validation:r=>r.required()}),
  defineField({name:"directGa4Confirmed",title:"I disabled GA4 page-view tags in GTM",type:"boolean",initialValue:false,
   hidden:({document})=>document?.ga4Source!=="direct",
   description:"Required only for website-direct GA4. This prevents accidentally adding a duplicate tracker alongside the existing GTM Google tag.",
   validation:r=>r.custom((value,context)=>context.document?.ga4Source==="direct"&&value!==true?"Confirm that GTM no longer fires another GA4 Google tag before enabling direct measurement.":true)})
 ],
 preview:{prepare:()=>({title:"Website Analytics & Tag Manager",subtitle:"GTM / GA4 IDs — public settings only"})}
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
 defineField({name:"externalLogoReference",type:"url",title:"Existing public logo candidate",readOnly:true,description:"Display/reference only. This is not evidence of publication rights, qualification scope, or endorsement."}),
 defineField({name:"logoAlt",type:"string",title:"Logo alternative text",description:"e.g., Saudi Aramco logo"}),
 defineField({name:"logoUseAuthorized",type:"boolean",title:"Logo rights and publication clearance confirmed",initialValue:false,description:"Obtain permission or confirm applicable nominative use and brand guidelines. Never imply endorsement or an approval beyond the supported scope."}),
 defineField({name:"verifiedScope",type:"boolean",initialValue:false,description:"Scope and current status verified against official documentation."}),
 defineField({name:"approvedForWeb",type:"boolean",initialValue:false,description:"Cleared for public release."})
]});
export const schemaTypes=[contactFormSettings,jobPosting,localizedText,contentSection,page,project,credential,initiative,siteSettings,analyticsSettings,testimonial,teamProfile,knowledgeArticle,companyUpdate,capabilityService,publicQualification];
