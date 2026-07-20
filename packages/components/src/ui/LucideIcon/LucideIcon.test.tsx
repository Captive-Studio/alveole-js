import { resolveShareIconName } from './LucideIcon';

describe('resolveShareIconName', () => {
  it.each([
    ['ios', 'Share'],
    ['android', 'Share2'],
    ['web', 'Forward'],
    ['windows', 'Share'],
    ['macos', 'Share'],
  ] as const)('retourne %s pour la plateforme %s', (platform, expected) => {
    expect(resolveShareIconName(platform)).toBe(expected);
  });
});
