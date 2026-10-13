import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ik7morln";
export default defineConfig({
 name:"default",title:"HEXA Steel® Content Studio",
 projectId,
 dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",
 plugins:[
  structureTool({structure:(S)=>S.list().title("HEXA Website Editorial").items([
   S.listItem().title("Website Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
   S.divider(),
   ...S.documentTypeListItems().filter(x=>x.getId()!=="siteSettings")
  ])}),
  visionTool()
 ],
 schema:{types:schemaTypes}
});
