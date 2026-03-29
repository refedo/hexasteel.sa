-- AlterTable
ALTER TABLE "public"."Testimonial" ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Testimonial" ADD CONSTRAINT "Testimonial_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
