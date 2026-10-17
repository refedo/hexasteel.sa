// Public, non-credential brand and locality facts only. Do not imply third-party approvals.
export const corporateStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hexasteel.sa/#organization",
      name: "HEXA Steel®",
      alternateName: ["Hexa Steel", "HEXA Steel"],
      url: "https://hexasteel.sa",
      description: "Saudi steel engineering and manufacturing company providing structural steel, pre-engineered buildings, detailing and fabrication services.",
      foundingDate: "2020",
      address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
      areaServed: { "@type": "Country", name: "Saudi Arabia" },
    },
    {
      "@type": "WebSite",
      "@id": "https://hexasteel.sa/#website",
      url: "https://hexasteel.sa",
      name: "HEXA Steel®",
      publisher: { "@id": "https://hexasteel.sa/#organization" },
      inLanguage: "en",
    }
  ],
} as const;
