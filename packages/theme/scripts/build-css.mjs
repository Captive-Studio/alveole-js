import { build } from 'esbuild';
import { unlinkSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const tmpFile = join(__dirname, '../.tmp-css-gen.cjs');

await build({
  entryPoints: [join(__dirname, '../src/helpers/injectVariableCSS.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: tmpFile,
  tsconfig: join(__dirname, '../tsconfig.build.json'),
  plugins: [
    {
      name: 'ttf-loader',
      setup(b) {
        b.onLoad({ filter: /\.ttf$/ }, ({ path }) => {
          const match = path.match(/[/\\]assets[/\\](fonts[/\\].+\.ttf)$/);
          const url = match ? `../assets/${match[1].replace(/\\/g, '/')}` : path;
          return { contents: `module.exports = ${JSON.stringify(url)}`, loader: 'js' };
        });
      },
    },
    {
      name: 'react-native-mock',
      setup(b) {
        b.onResolve({ filter: /^react-native$/ }, () => ({ path: 'rn', namespace: 'rn-mock' }));
        b.onLoad({ filter: /.*/, namespace: 'rn-mock' }, () => ({
          contents: `module.exports = { Platform: { OS: 'web', select: (obj) => obj.web ?? obj.default } }`,
          loader: 'js',
        }));
      },
    },
  ],
});

const { generateDefaultThemeCSS, generateFontFaceCSS, generateFontSmoothingCSS } = require(tmpFile);

const css = [generateFontFaceCSS(), generateFontSmoothingCSS(), generateDefaultThemeCSS()].join('\n\n');

writeFileSync(join(__dirname, '../dist/default.css'), css);
unlinkSync(tmpFile);
console.log('✓ dist/default.css generated');
