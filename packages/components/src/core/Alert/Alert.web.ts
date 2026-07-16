import type { AlertProps } from './Alert';

export const Alert = {
  alert: (props: AlertProps) => {
    const message = props.message ? `\n${props.message}` : '';
    window.alert(`${props.title}${message}`);
    props.buttons?.[0]?.onPress?.();
  },
};
