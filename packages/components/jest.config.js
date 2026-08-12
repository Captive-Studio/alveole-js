const path = require('path');
const expoPreset = require('jest-expo/ios/jest-preset');

/** @type {import('jest').Config} */
module.exports = {
  ...expoPreset,
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: [...(expoPreset.setupFilesAfterEnv ?? []), '<rootDir>/__tests__/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@testing-library/react-native|@tamagui/.*|tamagui|lucide-react-native|react-native-svg|standard-navigation)',
  ],
  testPathIgnorePatterns: [...(expoPreset.testPathIgnorePatterns ?? []), '/dist/', '/build/', '/.expo/', '/coverage/'],
  // eslint-disable-next-line no-undef
  cacheDirectory: path.join(__dirname, '.jest-cache'),
  collectCoverage: false,
  watchman: false,
  moduleNameMapper: {
    ...(expoPreset.moduleNameMapper ?? {}),
    '^@alveole/theme$': '<rootDir>/../theme/src/index.ts',
    '^@/(.*)$': '<rootDir>/$1',
    // Canonicalise ces paquets sur la copie résolue depuis ce package, quel que soit
    // l'endroit où npm les hoiste (racine ou ici) : plusieurs workspaces déclarent leurs
    // propres copies pour leur typecheck/tests, et des instances dupliquées cassent React
    // ("Incompatible React versions", hooks invalides) ou la config Jest elle-même.
    '^react-native$': require.resolve('react-native'),
    '^react-native/(.*)$': path.join(path.dirname(require.resolve('react-native/package.json')), '$1'),
    '^react$': require.resolve('react'),
    '^react-dom$': require.resolve('react-dom'),
    '^test-renderer$': require.resolve('test-renderer'),
    '^lucide-react-native$': require.resolve('lucide-react-native'),
    '^expo-modules-core$': require.resolve('expo-modules-core'),
    '^expo-modules-core/(.*)$': path.join(path.dirname(require.resolve('expo-modules-core/package.json')), '$1'),
  },
};
