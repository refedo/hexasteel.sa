import {ImportCareerRoles} from "./src/sanity/tools/ImportCareerRoles";
import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./src/sanity/schemaTypes";
import {ImportWebsiteContent} from "./src/sanity/tools/ImportWebsiteContent";
import {PublishDraftProjects} from "./src/sanity/tools/PublishDraftProjects";
import {BulkProjectStatus} from "./src/sanity/tools/BulkProjectStatus";
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ik7morln";
export default defineConfig({
 name:"default",title:"HEXA Steel® Content Studio",
 projectId,
 dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",
 plugins:[
  structureTool({structure:(S)=>S.list().title("HEXA Website Editorial").items([
   S.listItem().title("Import Existing Content").child(S.component(ImportWebsiteContent).title("Import website content")),
   S.listItem().title("Publish Project Drafts").child(S.component(PublishDraftProjects).title("Select and publish draft projects")),
   S.listItem().title("Bulk Update Project Status").child(S.component(BulkProjectStatus).title("Update selected project delivery statuses")),
   S.listItem().title("Website Theme & Settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
   S.listItem().title("Contact Form & Enquiry Email").id("contactFormSettings").child(S.document().schemaType("contactFormSettings").documentId("contactFormSettings")),
   S.listItem().title("Website Analytics").id("analyticsSettings").child(S.document().schemaType("analyticsSettings").documentId("analyticsSettings")),
   S.divider(),
   S.listItem().title("Website Pages").child(S.documentTypeList("page")),
   S.listItem().title("Projects & Case Studies").child(S.documentTypeList("project")),
   S.listItem().title("Prepare Existing Career Drafts").child(S.component(ImportCareerRoles).title("Prepare existing career drafts")),
   S.listItem().title("HR — Careers & Opportunities").child(S.documentTypeList("jobPosting").title("Career opportunities — publish status changes")),
   S.listItem().title("Knowledge Centre").child(S.documentTypeList("knowledgeArticle")),
   S.listItem().title("Company News & Insights").child(S.documentTypeList("companyUpdate")),
   S.listItem().title("Client Approvals & Qualifications").child(S.documentTypeList("publicQualification")),
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
