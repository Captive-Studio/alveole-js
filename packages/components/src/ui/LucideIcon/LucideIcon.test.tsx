import { render } from '@/__tests__/helpers';
import { LucideIcon, resolveShareIconName } from './LucideIcon';

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

describe('LucideIcon _platformOverride', () => {
  it.each(['ios', 'android', 'web'] as const)('rend sans erreur pour _platformOverride=%s', async platform => {
    await expect(render(<LucideIcon name="Share" size="md" _platformOverride={platform} />)).resolves.toBeTruthy();
  });
});
