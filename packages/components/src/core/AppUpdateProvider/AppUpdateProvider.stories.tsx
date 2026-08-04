import { Story } from '../../type';
import { UpdateRequired } from '../UpdateRequired';
import { AppUpdateProvider } from './AppUpdateProvider';

const description = [
  "Bloque l'app et affiche un écran de mise à jour forcée quand une nouvelle version native est disponible sur les stores (App Store / Play Store).",
  '',
  '## Props',
  '',
  "- `iosAppId` : identifiant numérique App Store Connect (ex. `'6759812160'`), obligatoire.",
  '- `androidPackageId` : **ne pas passer** — récupéré automatiquement via `Application.applicationId` au runtime.',
  '- `title`, `description`, `buttonLabel` : optionnels, des valeurs françaises par défaut sont intégrées.',
  '',
  '## Comportement par plateforme',
  '',
  "- **iOS** : affiche l'écran `UpdateRequired` avec un bouton qui ouvre l'App Store.",
  "- **Android** : déclenche automatiquement le flow de mise à jour immédiat du Play Store (`startUpdate(true)`). Si l'utilisateur annule ou si ça échoue, l'écran s'affiche en fallback.",
  "- **Web** : aucun blocage — `expo-in-app-updates` n'est pas supporté sur web.",
  '',
  '## Throttle',
  '',
  "Le check est effectué au démarrage de l'app, puis à chaque retour en foreground, mais au maximum une fois toutes les 12h pour éviter des appels réseau inutiles.",
  '',
  '## Configuration de iosAppId',
  '',
  "L'iosAppId est l'identifiant numérique App Store Connect. Le configurer dans `app.config.js` pour différencier staging et production au moment du build :",
  '',
  '```js',
  '// app.config.js',
  "const isStaging = process.env.EXPO_PUBLIC_APP_ENV === 'staging';",
  "const appStoreID = isStaging ? '<staging_id>' : '<production_id>';",
  '',
  'export default {',
  '  expo: {',
  '    extra: { IOS_STORE_ID: appStoreID },',
  '  },',
  '};',
  '```',
  '',
  'Puis dans `constants/ConstantExtra.ts` pour le lire à runtime :',
  '',
  '```ts',
  'export const constantExtras = {',
  '  IOS_STORE_ID: Constants.expoConfig?.extra?.IOS_STORE_ID,',
  '};',
  '```',
  '',
  '```tsx',
  '// app/_layout.tsx',
  'const AppGate = () => {',
  '  const { t } = useTranslation();',
  '  return (',
  '    <AppUpdateProvider',
  "      iosAppId={constantExtras.IOS_STORE_ID ?? ''}",
  "      title={t('screens.updateRequired.title')}",
  "      description={t('screens.updateRequired.description')}",
  "      buttonLabel={t('actions.update')}",
  '    >',
  '      <Slot />',
  '    </AppUpdateProvider>',
  '  );',
  '};',
  '```',
].join('\n');

export default {
  title: 'AppUpdateProvider',
  tags: ['core'],
  experimental: false,
  description,
  shortDescription: "Bloque l'app si une nouvelle version native est disponible.",
  figmaURL:
    'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Alveole---Composants?node-id=3341-46&t=NswBNb22DDDlXjp5-4',
  component: AppUpdateProvider,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

/**
 * Rendu de l'écran affiché quand une mise à jour est disponible.
 *
 * En production, cet écran s'affiche automatiquement via `AppUpdateProvider`
 * quand [expo-in-app-updates](https://github.com/SohelIslamImran/expo-in-app-updates) détecte une nouvelle version sur les stores.
 */
export const EcranMiseAJour = () => (
  <UpdateRequired
    title="Une mise à jour de l'application est nécessaire."
    description="La version actuelle de votre application n'est plus valide. Téléchargez la nouvelle version de l'application pour continuer."
    buttonLabel="Mettre à jour"
    onUpdate={() => {}}
  />
);

export * as Sources from './AppUpdateProvider.stories.sources';
