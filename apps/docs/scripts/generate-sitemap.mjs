import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const BASE_URL = 'https://alveole.captive.fr';
const TITLE_RE = /title:\s*['"]([^'"]+)['"]/;

const storyFiles = await Array.fromAsync(glob('packages/components/src/**/*.stories.tsx', { cwd: root }));

const titles = storyFiles
  .map(file => {
    const content = readFileSync(resolve(root, file), 'utf8');
    const match = content.match(TITLE_RE);
    return match?.[1] ?? null;
  })
  .filter(Boolean)
  .sort();

const lastmod = new Date().toISOString();

const urls = [
  `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0000</priority>\n  </url>`,
  ...titles.map(
    title =>
      `  <url>\n    <loc>${BASE_URL}/components/${encodeURIComponent(title)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8000</priority>\n  </url>`,
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>\n`;

const outputPath = resolve(import.meta.dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`generated sitemap.xml with ${titles.length} components`);
