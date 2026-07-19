export const sanitizeCSSKey = (key: string): string =>
  key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
