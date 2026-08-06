import { readFileSync, writeFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../../..');
const BASE_URL = 'https://alveole.captive.fr';
const TITLE_RE = /title:\s*['"]([^'"]+)['"]/;
const CONSTANT_RE = /^export const ([A-Za-z][A-Za-z0-9_]*)/gm;

const storyFiles = await Array.fromAsync(glob('packages/components/src/**/*.stories.tsx', { cwd: root }));
const themeConstantFiles = await Array.fromAsync(glob('packages/theme/src/constants/*.ts', { cwd: root }));

const componentTitles = storyFiles
  .map(file => readFileSync(resolve(root, file), 'utf8').match(TITLE_RE)?.[1] ?? null)
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b));

const themeConstants = themeConstantFiles
  .flatMap(file => [...readFileSync(resolve(root, file), 'utf8').matchAll(CONSTANT_RE)].map(m => m[1]))
  .sort((a, b) => a.localeCompare(b));

const staticPages = [
  '/philosophy',
  '/components',
  '/constants',
  '/theme/colors',
  '/theme/css-variables',
  '/theme/typographies',
];

const lastmod = new Date().toISOString();

const makeUrl = (path, changefreq = 'monthly', priority = '0.8000') =>
  `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const urls = [
  makeUrl('/', 'daily', '1.0000'),
  ...staticPages.map(p => makeUrl(p)),
  ...componentTitles.map(title => makeUrl(`/components/${encodeURIComponent(title)}`)),
  ...themeConstants.map(name => makeUrl(`/constants/${encodeURIComponent(name)}`)),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>\n`;

const outputPath = resolve(import.meta.dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml);
console.log(`generated sitemap.xml with ${componentTitles.length} components and ${themeConstants.length} constants`);
