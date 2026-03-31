import type { GetServerSideProps } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hexasteel.sa';

export default function RobotsTxt() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const content = `# Hexa Steel® robots.txt
User-agent: *
Allow: /

# Block admin and API routes from crawlers
Disallow: /admin/
Disallow: /admin-bypass/
Disallow: /api/
Disallow: /temp_products/

# Allow public API for structured data
Allow: /api/public/

Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  res.write(content);
  res.end();

  return { props: {} };
};
