import { Story } from '../../type';
import { UpdateRequired } from '../UpdateRequired';
import { AppUpdateProvider } from './AppUpdateProvider';

export default {
  title: 'AppUpdateProvider',
  tags: ['core'],
  experimental: false,
  description:
    "Bloque l'app et affiche un écran de mise à jour forcée quand une nouvelle version native est disponible sur les stores (App Store / Play Store).",
  shortDescription: "Bloque l'app si une nouvelle version native est disponible.",
  component: AppUpdateProvider,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

/**
 * Rendu de l'écran affiché quand une mise à jour est disponible.
 *
 * En production, cet écran s'affiche automatiquement via `AppUpdateProvider`
 * quand `expo-in-app-updates` détecte une nouvelle version sur les stores.
 */
export const EcranMiseAJour = () => (
  <UpdateRequired
    title="Une mise à jour de l'application est nécessaire."
    description="La version actuelle de votre application n'est plus valide. Téléchargez la nouvelle version de l'application pour continuer."
    buttonLabel="Mettre à jour"
    onUpdate={() => {}}
  />
);

/**
 * Intégration dans `app/_layout.tsx`, à placer à l'intérieur de `TranslationProvider`
 * pour pouvoir surcharger les textes avec les traductions de l'app.
 *
 * - `iosAppId` : identifiant numérique App Store Connect (ex. `'6759812160'`), obligatoire.
 * - `androidPackageId` : **ne pas passer** — récupéré automatiquement via `Application.applicationId` au runtime.
 * - `title`, `description`, `buttonLabel` : optionnels, des valeurs françaises par défaut sont intégrées.
 *
 * ## Comportement par plateforme
 *
 * - **iOS** : affiche l'écran `UpdateRequired` avec un bouton qui ouvre l'App Store.
 * - **Android** : déclenche automatiquement le flow de mise à jour immédiat du Play Store (`startUpdate(true)`).
 *   Si l'utilisateur annule ou si ça échoue, l'écran s'affiche en fallback.
 * - **Web** : aucun blocage — `expo-in-app-updates` n'est pas supporté sur web.
 *
 * ## Throttle
 *
 * Le check est effectué au démarrage de l'app, puis à chaque retour en foreground,
 * mais au maximum une fois toutes les 12h pour éviter des appels réseau inutiles.
 *
 * ```tsx
 * // app/_layout.tsx
 * const AppGate = () => {
 *   const { t } = useTranslation();
 *   return (
 *     <AppUpdateProvider
 *       iosAppId={constantExtras.IOS_STORE_ID ?? ''}
 *       title={t('screens.updateRequired.title')}
 *       description={t('screens.updateRequired.description')}
 *       buttonLabel={t('actions.update')}
 *     >
 *       <Slot />
 *     </AppUpdateProvider>
 *   );
 * };
 * ```
 */
export const Integration = () => null;

export * as Sources from './AppUpdateProvider.stories.sources';
