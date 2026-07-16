import { Story } from '../../type';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { Page } from './Page';

export default {
  title: 'Pages',
  tags: ['core'],
  experimental: false,
  description:
    "Permet de définir les valeurs de la balise <head> via Expo router. Doit englober toutes les pages. Permet aussi de rendre la page scrollable via l'attribut `scrollable`. Principalement pour le web.",
  component: Page,
  styleFn: () => 'Aucun style appliqué',
} satisfies Story;

export const Default = () => (
  <Page title="Mon titre" description="Description">
    <Typography>Contenu de la page</Typography>
  </Page>
);

export const WithOg = () => (
  <Page title="Mon titre" description="Description" og={{ title: 'OG titre', description: 'OG description' }}>
    <Typography>Page avec Open Graph personnalisé</Typography>
  </Page>
);

export const WithMetaRobots = () => (
  <Page title="Page privée" meta={[{ name: 'robots', content: 'noindex, nofollow' }]}>
    <Typography>Cette page ne sera pas indexée par les moteurs de recherche.</Typography>
  </Page>
);

export const WithMultipleMeta = () => (
  <Page
    title="Page complète"
    description="Avec plusieurs balises meta"
    meta={[
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'author', content: 'Alvéole' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
    ]}
  >
    <Typography>Page avec plusieurs balises meta personnalisées.</Typography>
  </Page>
);

export const WithSidebar = () => (
  <Box>
    <Typography>
      {`const sidebarController = useSidebar();
return (
  <Page
    sideBarController={sidebarController}
    sidebar={<AdminNavigation sidebarController={sidebarController} />}
    title="Mon titre"
  >
    {/* ... */}
  </Page>
);`}
    </Typography>
  </Box>
);

export * as Sources from './Page.stories.sources';
