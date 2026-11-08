import Link from "next/link";
import {PageHero} from "@/components/PageBlocks";
import {specialtySteelProducts, type SpecialtySteelSlug} from "@/content/specialtySteelProducts";

export function SpecialtySteelProduct({slug}: {slug: SpecialtySteelSlug}) {
  const product = specialtySteelProducts[slug];
  return <main>
    <PageHero eyebrow="PRODUCTS / SPECIALTY STEEL" title={product.title} intro={product.description}/>
    <section className="section">
      <div className="shell">
        <Link className="text-link" href="/products-services">All products and services</Link>
        <h2>Typical applications</h2>
        <ul>{product.applications.map(application => <li key={application}>{application}</li>)}</ul>
        <h2>Request a project quotation</h2>
        <p>{product.rfqDetails}</p>
        <Link className="button dark" href={`/request-quotation?service=${slug}`}>Request a quotation</Link>
      </div>
    </section>
  </main>;
}
