import type { GetServerSideProps } from 'next';
import prisma from '../lib/prisma';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hexasteel.sa';

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.9', changefreq: 'monthly' },
  { url: '/products', priority: '0.9', changefreq: 'weekly' },
  { url: '/projects', priority: '0.9', changefreq: 'weekly' },
  { url: '/blog', priority: '0.8', changefreq: 'daily' },
  { url: '/team', priority: '0.7', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/careers', priority: '0.7', changefreq: 'weekly' },
  { url: '/certifications', priority: '0.7', changefreq: 'monthly' },
  { url: '/faq', priority: '0.7', changefreq: 'monthly' },
  { url: '/factory-capabilities', priority: '0.7', changefreq: 'monthly' },
  { url: '/sustainability', priority: '0.7', changefreq: 'monthly' },
  { url: '/initiatives', priority: '0.7', changefreq: 'monthly' },
  { url: '/news', priority: '0.7', changefreq: 'weekly' },
  { url: '/partner', priority: '0.6', changefreq: 'monthly' },
  { url: '/knowledge', priority: '0.8', changefreq: 'weekly' },
];

function generateSiteMap(pages: { url: string; lastmod?: string; priority: string; changefreq: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
    .map(
      ({ url, lastmod, priority, changefreq }) => `
  <url>
    <loc>${SITE_URL}${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;
}

export default function SitemapXML() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().split('T')[0];

  const pages = [...staticPages.map((p) => ({ ...p, lastmod: today }))];

  try {
    // Dynamic blog posts
    const blogs = await prisma.blog.findMany({
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
    blogs.forEach((blog) => {
      pages.push({
        url: `/blog/${blog.slug}`,
        lastmod: blog.updatedAt.toISOString().split('T')[0],
        priority: '0.7',
        changefreq: 'monthly',
      });
    });

    // Dynamic products
    const products = await prisma.product.findMany({
      select: { slug: true, updatedAt: true },
    });
    products.forEach((p) => {
      pages.push({
        url: `/products/${p.slug}`,
        lastmod: p.updatedAt.toISOString().split('T')[0],
        priority: '0.8',
        changefreq: 'monthly',
      });
    });

    // Dynamic knowledge articles
    const knowledge = await prisma.knowledgeContent.findMany({
      select: { slug: true, updatedAt: true },
    });
    knowledge.forEach((k) => {
      pages.push({
        url: `/knowledge/${k.slug}`,
        lastmod: k.updatedAt.toISOString().split('T')[0],
        priority: '0.7',
        changefreq: 'monthly',
      });
    });
  } catch (err) {
    // DB might not be available; proceed with static pages only
  }

  const sitemap = generateSiteMap(pages);

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
};
