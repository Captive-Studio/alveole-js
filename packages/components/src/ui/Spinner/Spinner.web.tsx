import React from 'react';
import { Animated, Easing } from 'react-native';
import { DELAY_MS, SIZE_MAP, SpinnerProps, STROKE_MAP } from './Spinner.shared';
import { useStyles } from './Spinner.styles';

export type { SpinnerProps };

function resolveDelay(delay: SpinnerProps['delay']): number | null {
  if (delay === undefined || delay === false) return null;
  if (delay === true) return 1000;
  if (typeof delay === 'string') return DELAY_MS[delay] ?? 0;
  return delay;
}

export const Spinner = ({ size = 'md', delay, style }: SpinnerProps) => {
  const styles = useStyles();
  const [rotation] = React.useState(() => new Animated.Value(0));
  const delayMs = React.useMemo(() => resolveDelay(delay), [delay]);
  const [visible, setVisible] = React.useState(delayMs === null);

  const px = SIZE_MAP[size];
  const strokeWidth = STROKE_MAP[size];
  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  React.useEffect(() => {
    if (delayMs === null) return;
    const timer = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  React.useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [rotation]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        {
          width: px,
          height: px,
          borderRadius: px / 2,
          borderWidth: strokeWidth,
          borderColor: styles.track.color,
          borderTopColor: styles.arc.color,
          transform: [{ rotate: spin }],
        },
        style,
      ]}
    />
  );
};
