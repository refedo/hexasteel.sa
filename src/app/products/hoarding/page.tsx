import {SpecialtySteelProduct} from "@/components/SpecialtySteelProduct";
import {specialtySteelProducts} from "@/content/specialtySteelProducts";
import {publicPageMetadata} from "@/lib/seo";

const product = specialtySteelProducts["hoarding"];
export const metadata = {
  ...publicPageMetadata("/products/hoarding", product.seoTitle, product.description),
  keywords: product.keywords,
};

export default function Page() {
  return <SpecialtySteelProduct slug="hoarding"/>;
}
