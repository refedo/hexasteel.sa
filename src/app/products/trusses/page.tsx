import {SpecialtySteelProduct} from "@/components/SpecialtySteelProduct";
import {specialtySteelProducts} from "@/content/specialtySteelProducts";
import {publicPageMetadata} from "@/lib/seo";

const product = specialtySteelProducts["trusses"];
export const metadata = {
  ...publicPageMetadata("/products/trusses", product.seoTitle, product.description),
  keywords: product.keywords,
};

export default function Page() {
  return <SpecialtySteelProduct slug="trusses"/>;
}
