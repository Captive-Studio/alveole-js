import React from 'react';
import type { MetaTagProps } from './Page';

type PageMetaContextValue = {
  meta: MetaTagProps[];
};

const PageMetaContext = React.createContext<PageMetaContextValue>({ meta: [] });

export const usePageMeta = () => React.useContext(PageMetaContext);

export const PageMetaProvider = ({ meta, children }: { meta: MetaTagProps[]; children: React.ReactNode }) => (
  <PageMetaContext.Provider value={{ meta }}>{children}</PageMetaContext.Provider>
);
