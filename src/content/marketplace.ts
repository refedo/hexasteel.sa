export type MarketplaceItem = {
  slug: string;
  title: string;
  category: "Product" | "Service";
  description: string;
  unit: string;
  priceHalalas?: number | null;
  image?: string | null;
  imageAlt?: string | null;
};

export const purlinOffer = {
  priceHalalas: 500000,
  thickness: "1.5–3.0 mm",
  cWeb: "80–300 mm",
  zWeb: "120–300 mm",
  flange: "30–100 mm",
  lip: "10–25 mm",
};

const purlinDetails = `Steel thickness ${purlinOffer.thickness}, flange ${purlinOffer.flange} and lip ${purlinOffer.lip}.`;

export const marketplaceDefaults: MarketplaceItem[] = [
  {
    slug: "c-purlins", title: "C purlins", category: "Product", unit: "tonne",
    description: `C sections for roof purlins and wall girts. Web ${purlinOffer.cWeb}. ${purlinDetails}`,
    priceHalalas: purlinOffer.priceHalalas,
  },
  {
    slug: "z-purlins", title: "Z purlins", category: "Product", unit: "tonne",
    description: `Z sections for roof purlins and wall girts, including lapped arrangements where designed. Web ${purlinOffer.zWeb}. ${purlinDetails}`,
    priceHalalas: purlinOffer.priceHalalas,
  },
  {
    slug: "steel-decking", title: "Steel decking", category: "Product", unit: "m²",
    description: "Profiled steel deck in 0.7–1.5 mm thickness, with rib geometry selected for the project.",
    image: "/images/sheeting/deck-60.jpeg", imageAlt: "Sample 60 mm metal decking profile drawing",
  },
  {
    slug: "sandwich-panels", title: "Insulated sandwich panels", category: "Product", unit: "m²",
    description: "Roof and wall panels with 30–200 mm panel thickness, excluding the upper rib. Typical upper rib height is 25–38 mm.",
  },
  {
    slug: "steel-design-detailing", title: "Steel design and detailing", category: "Service", unit: "project",
    description: "Structural steel design, connection coordination and fabrication detailing.",
  },
  {
    slug: "steel-fabrication", title: "Steel fabrication", category: "Service", unit: "project",
    description: "Fabrication of structural steel assemblies and components to project requirements.",
  },
  {
    slug: "laser-cutting", title: "Laser cutting", category: "Service", unit: "job",
    description: "CNC laser cutting of steel plates and components to supplied drawings.",
  },
];

const sar = new Intl.NumberFormat("en-SA", {style:"currency",currency:"SAR",currencyDisplay:"code"});
export function formatMarketplacePrice(halalas: number) {
  return sar.format(halalas / 100);
}
