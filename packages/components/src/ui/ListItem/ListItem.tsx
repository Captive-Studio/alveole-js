import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Box, BoxProps, Image, Typography } from '../../core';
import { Avatar, AvatarProps } from '../Avatar';
import { IconProps, LucideIcon } from '../LucideIcon';
import { RadioGroup, RadioInputProps } from '../RadioGroup';
import { Spinner } from '../Spinner';
import { useStyles } from './ListItem.styles';

export type ListItemProps = BoxProps & {
  title: string;
  description?: string;
  IconProps?: Pick<IconProps, 'color' | 'name'>;
  AvatarProps?: Pick<AvatarProps, 'fallbackText' | 'src'>;
  RadioProps?: Pick<RadioInputProps, 'checked' | 'onChange' | 'value'>;
  preview_url?: string;
  trailing?: () => React.ReactNode;
  loading?: boolean;
  showSeparateur?: boolean;
};

export const ListItem = (props: ListItemProps) => {
  const {
    children,
    title,
    description,
    style,
    AvatarProps,
    IconProps,
    RadioProps,
    preview_url,
    trailing,
    loading = false,
    showSeparateur = true,
    onPress,
    ...itemProps
  } = props;

  const handlePress = React.useCallback(
    (event: GestureResponderEvent) => {
      if (RadioProps) RadioProps.onChange?.(RadioProps.value);
      onPress?.(event);
    },
    [RadioProps, onPress],
  );

  const styles = useStyles();

  return (
    <Box>
      <Box
        tag="resource-item"
        style={[styles.item, style]}
        hoverStyle={onPress || RadioProps ? styles.itemHover : {}}
        onPress={handlePress}
        {...itemProps}
      >
        {preview_url ? (
          <Box style={styles.previewContainer}>
            <Image
              source={{ uri: preview_url }}
              width={styles.preview.width}
              height={styles.preview.height}
              contentFit="contain"
            />
          </Box>
        ) : (
          <Box display="flex" flexDirection="row" gap={'3V'}>
            {RadioProps && (
              <Box mt={'auto'} mb={'auto'}>
                <RadioGroup.Input id={`${title}--radio`} size="md" {...RadioProps} />
              </Box>
            )}
            {IconProps && (
              <Box mt={'auto'} mb={'auto'}>
                <LucideIcon size="sm" color={styles.defaultIcon.color} {...IconProps} />
              </Box>
            )}
            {AvatarProps && (
              <Box mt={'auto'} mb={'auto'}>
                <Avatar size="xs" {...AvatarProps} />
              </Box>
            )}
          </Box>
        )}

        <Box style={styles.detail}>
          {showSeparateur && <Box style={styles.separateur}></Box>}
          <Box style={styles.principal}>
            <Typography style={styles.title}>{title}</Typography>
            {description && <Typography style={styles.description}>{description}</Typography>}
          </Box>

          {trailing && trailing()}
        </Box>

        {loading && (
          <Box style={styles.loading}>
            <Spinner size="sm" />
          </Box>
        )}
      </Box>

      {children}
    </Box>
  );
};
