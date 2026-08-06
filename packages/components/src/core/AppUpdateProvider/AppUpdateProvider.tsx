import * as Application from 'expo-application';
import Constants from 'expo-constants';
import React from 'react';
import { AppState, Linking, Platform } from 'react-native';
import { UpdateRequired } from '../UpdateRequired';

type AppUpdateState = { isChecking: boolean };

const AppUpdateContext = React.createContext<AppUpdateState | null>(null);

export const useAppUpdateState = (): AppUpdateState => {
  const ctx = React.useContext(AppUpdateContext);
  if (!ctx) throw new Error('useAppUpdateState must be used inside AppUpdateProvider');
  return ctx;
};

export type AppUpdateProviderProps = React.PropsWithChildren<{
  title?: string;
  description?: string;
  buttonLabel?: string;
  /** Numeric App Store Connect ID (e.g. '6759812160'). Required on iOS. */
  iosAppId: string;
  /** Android package name. Defaults to Application.applicationId if omitted. */
  androidPackageId?: string;
}>;

const DEFAULT_TITLE = "Une mise à jour de l'application est nécessaire.";
const DEFAULT_DESCRIPTION =
  "La version actuelle de votre application n'est plus valide. Téléchargez la nouvelle version de l'application pour continuer.";
const DEFAULT_BUTTON_LABEL = 'Mettre à jour';

export const THROTTLE_MS = 12 * 60 * 60 * 1000; // 12h

export const shouldRunCheck = (lastCheckedAt: number, now: number): boolean => now - lastCheckedAt >= THROTTLE_MS;

type State = { isChecking: boolean; isUpdateRequired: boolean };
type Action = { type: 'CHECK_COMPLETE' } | { type: 'UPDATE_REQUIRED' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHECK_COMPLETE':
      return { ...state, isChecking: false };
    case 'UPDATE_REQUIRED':
      return { isChecking: false, isUpdateRequired: true };
  }
};

export const AppUpdateProvider = (props: AppUpdateProviderProps) => {
  const {
    children,
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    buttonLabel = DEFAULT_BUTTON_LABEL,
    iosAppId,
    androidPackageId,
  } = props;

  // expo-in-app-updates requires a real store client — skip in Expo Go and web
  const isNativeStoreClient = Platform.OS !== 'web' && Constants.executionEnvironment !== 'storeClient';

  const [{ isChecking, isUpdateRequired }, dispatch] = React.useReducer(reducer, {
    isChecking: isNativeStoreClient,
    isUpdateRequired: false,
  });
  const lastCheckedAt = React.useRef<number>(0);

  const openStore = React.useCallback(() => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`https://apps.apple.com/app/id${iosAppId}`);
    } else {
      const pkg = androidPackageId ?? Application.applicationId ?? '';
      Linking.openURL(`market://details?id=${pkg}`);
    }
  }, [iosAppId, androidPackageId]);

  const runCheck = React.useCallback(
    async (isInitial = false) => {
      const now = Date.now();
      if (!isInitial && !shouldRunCheck(lastCheckedAt.current, now)) return;
      lastCheckedAt.current = now;

      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { checkForUpdate, startUpdate } = require('expo-in-app-updates') as typeof import('expo-in-app-updates');
        const { updateAvailable } = await checkForUpdate();
        if (updateAvailable) {
          if (Platform.OS === 'android') {
            await startUpdate(true);
            // If we reach here the immediate update was cancelled or failed → fallback to screen
          }
          dispatch({ type: 'UPDATE_REQUIRED' });
        }
      } catch {
        // Check failed: don't block the user
      } finally {
        dispatch({ type: 'CHECK_COMPLETE' });
      }
    },
    [dispatch],
  );

  React.useEffect(() => {
    if (!isNativeStoreClient) return;
    runCheck(true);
  }, [runCheck, isNativeStoreClient]);

  React.useEffect(() => {
    if (!isNativeStoreClient) return;
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') runCheck(false);
    });
    return () => subscription.remove();
  }, [runCheck, isNativeStoreClient]);

  return (
    <AppUpdateContext.Provider value={{ isChecking }}>
      {!isChecking && isUpdateRequired ? (
        <UpdateRequired title={title} description={description} buttonLabel={buttonLabel} onUpdate={openStore} />
      ) : (
        children
      )}
    </AppUpdateContext.Provider>
  );
};
