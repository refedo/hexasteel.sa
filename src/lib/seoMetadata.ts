import type { Metadata } from "next";

type Input = { path: string; title: string; description: string; keywords?: string[] };
export function seoMetadata({ path, title, description, keywords }: Input): Metadata {
  const url = "https://hexasteel.sa" + (path === "/" ? "" : path);
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "HEXA Steel®",
      locale: "en_SA",
      url,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
