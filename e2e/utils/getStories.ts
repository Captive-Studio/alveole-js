import * as fs from 'fs';
import * as path from 'path';

export type StoryCase = {
  moduleName: string;
  exportName: string;
};

export function getStories(): StoryCase[] {
  const barrelPath = path.resolve('packages/components/src/stories/index.ts');
  const barrel = fs.readFileSync(barrelPath, 'utf-8');

  const modules = [...barrel.matchAll(/export \* as (\w+) from '(.+)'/g)];

  return modules.flatMap(([, moduleName, relativePath]) => {
    // relativePath est relatif à src/stories/, ex : '../ui/Button/Button.stories'
    const filePath = path.resolve(
      'packages/components/src/stories',
      relativePath + '.tsx'
    );

    if (!fs.existsSync(filePath)) return [];

    const content = fs.readFileSync(filePath, 'utf-8');
    const exports = [...content.matchAll(/^export const (\w+)/gm)]
      .map(([, name]) => name)
      .filter((name) => name !== 'Sources');

    return exports.map((exportName) => ({ moduleName, exportName }));
  });
}
