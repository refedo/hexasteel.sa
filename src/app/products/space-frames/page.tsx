import {SpecialtySteelProduct} from "@/components/SpecialtySteelProduct";
import {specialtySteelProducts} from "@/content/specialtySteelProducts";
import {publicPageMetadata} from "@/lib/seo";

const product = specialtySteelProducts["space-frames"];
export const metadata = {
  ...publicPageMetadata("/products/space-frames", product.seoTitle, product.description),
  keywords: product.keywords,
};

export default function Page() {
  return <SpecialtySteelProduct slug="space-frames"/>;
}
