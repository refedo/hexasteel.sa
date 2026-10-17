import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";
import {ImportWebsiteContent} from "./src/sanity/tools/ImportWebsiteContent";
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ik7morln";
export default defineConfig({
 name:"default",title:"HEXA Steel® Content Studio",
 projectId,
 dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",
 plugins:[
  structureTool({structure:(S)=>S.list().title("HEXA Website Editorial").items([
   S.listItem().title("Import Current Website Content").child(S.component(ImportWebsiteContent).title("Import existing content")),
   S.listItem().title("Website Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
   S.divider(),
   ...["page","project","knowledgeArticle","companyUpdate","publicQualification"].map(type=>S.documentTypeListItem(type)),
   S.divider(),
   S.listItem().title("Other Schemas — Not Yet Connected to Website").child(
    S.list().title("Not Yet Connected").items(
     ["credential","initiative","testimonial","teamProfile","capabilityService"].map(type=>S.documentTypeListItem(type))
    )
   )
  ])}),
  visionTool()
 ],
 schema:{types:schemaTypes}
});
