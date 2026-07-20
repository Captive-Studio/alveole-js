import * as LabIcons from '@lucide/lab';
import * as LucideIcons from 'lucide-react-native';
import { Icon as BaseIcon, LucideIcon as Icon } from 'lucide-react-native';
import { Platform, StyleProp, ViewStyle } from 'react-native';
import { isLucideIconName, LucideIconName, LucideIconProps } from './LucideIcon.props';

export const strokeWidth = 1.5;

export type IconProps = LucideIconProps;

// Chaque plateforme a une convention visuelle différente pour le partage :
// iOS utilise la flèche vers le haut (Share), Android le symbole à trois points (Share2),
// et le web la flèche vers l'avant (Forward).
export const resolveShareIconName = (platform: typeof Platform.OS): LucideIconName => {
  switch (platform) {
    case 'ios':
      return 'Share';
    case 'android':
      return 'Share2';
    case 'web':
      return 'Forward';
    default:
      return 'Share';
  }
};

export const LucideIcon = (props: IconProps) => {
  const { style, size, color } = props;
  let { name } = props;

  if (name === 'Share') {
    name = resolveShareIconName(Platform.OS);
  }

  const iconMap = LucideIcons as unknown as Record<LucideIconName, Icon>;

  const sizeMap: Record<IconProps['size'], number> = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 64,
  };

  const defaultStyle = { stroke: color ?? 'currentColor' };
  const mergedStyle = [defaultStyle, style];

  if (isLucideIconName(name)) {
    const IconComponent = iconMap[name];
    return (
      <IconComponent
        style={mergedStyle as StyleProp<ViewStyle>}
        strokeWidth={strokeWidth}
        color={color}
        size={sizeMap[size]}
      />
    );
  }

  return (
    <BaseIcon
      iconNode={(LabIcons as any)?.[name]}
      style={mergedStyle as StyleProp<ViewStyle>}
      strokeWidth={strokeWidth}
      color={color}
      size={sizeMap[size]}
    />
  );
};
