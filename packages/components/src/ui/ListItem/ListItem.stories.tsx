import { Story } from '../../type/Story';
import { ButtonIcon } from '../Button';
import { ListItem } from './ListItem';
import { useStyles } from './ListItem.styles';

export default {
  title: 'ListItem',
  tags: ['ui'],
  experimental: false,
  figmaURL: 'https://www.figma.com/design/xJz8Z6vfrnZPKTtRbuT2W8/Composants?node-id=1002-558',
  description: 'Permet d’afficher les données d‘une ressource.',
  component: ListItem,
  styleFn: useStyles,
} satisfies Story;

export const Default = () => (
  <ListItem
    title="Titre"
    description="Description"
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithTrailing = () => (
  <ListItem
    title="Titre"
    description="Description"
    trailing={() => <ButtonIcon variant="tertiary" icon="CircleX" onPress={() => console.log('remove')} />}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithLoading = () => (
  <ListItem
    title="Titre"
    description="Description"
    loading={true}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithoutSeparator = () => (
  <ListItem
    title="Titre"
    description="Description"
    showSeparateur={false}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithIcon = () => (
  <ListItem
    title="Titre"
    description="Description"
    IconProps={{ name: 'Settings', color: 'primary' }}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithAvatar = () => (
  <ListItem
    title="Titre"
    description="Description"
    AvatarProps={{
      fallbackText: 'Jean Pierre',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    }}
    onPress={() => {
      window.alert('click !');
    }}
  />
);

export const WithPreviewImage = () => (
  <ListItem
    title="Titre"
    description="Description"
    preview_url="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    onPress={() => {
      window.alert('click !');
    }}
  />
);

/** Sans prop `onPress`, l’effet de hover n’apparaît pas. */
export const withoutHover = () => <ListItem title="Titre" description="Description" />;

export * as Sources from './ListItem.stories.sources';
