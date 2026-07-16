import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ text, color, spacing }) => ({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing('050'),
  },
  checkbox: {
    height: spacing('150'),
    width: spacing('150'),
    backgroundColor: 'transparent',
    borderColor: color.light.border['action-high-primary'],
    borderRadius: 6,
  },
  checkboxSm: {
    height: spacing('100'),
    width: spacing('100'),
    borderRadius: 4,
  },
  checkboxDisabled: {
    borderColor: color.border['disabled-grey'],
    backgroundColor: 'transparent',
  },
  checkboxError: {
    borderColor: color.border['plain-error'],
  },
  checkboxSuccess: {
    borderColor: color.border['plain-success'],
  },
  indicator: {
    height: spacing('150'),
    width: spacing('150'),
    backgroundColor: color.light.background['action-high-primary'],
    borderRadius: 6,
  },
  indicatorDisabled: {
    backgroundColor: color.background['disabled-grey'],
  },
  label: {
    width: '100%',
    ...text['Corps de texte'].MD.Regular,
    cursor: 'pointer',
    color: color.text['label-grey'],
  },
  labelSm: {
    ...text['Corps de texte'].SM.Regular,
  },
  labelDisabled: {
    cursor: 'not-allowed',
    color: color.text['disabled-grey'],
  },
  labelError: {
    color: color.text['default-error'],
  },
  labelSuccess: {
    color: color.text['default-success'],
  },
}));
