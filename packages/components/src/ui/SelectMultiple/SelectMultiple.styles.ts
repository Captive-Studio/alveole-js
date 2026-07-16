import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing }) => ({
  select: {
    flex: 1,
    outline: 'none',
    paddingTop: 0,
    paddingBottom: 0,
    color: color.text['default-grey'],
    width: '100%',
    borderWidth: 0,
    backgroundColor: 'transparent',
    appearance: 'none',
  },
  inputContainer: {
    width: '100%',
  },
  inputDisabled: {
    borderRadius: 6,
    borderColor: color.background['disabled-grey'],
  },
  control: {
    minHeight: spacing('200'),
    flexWrap: 'inherit',
    borderColor: color.border['default-grey'],
  },
  controlDisabled: {
    borderColor: color.background['disabled-grey'],
  },
  valueContainer: {
    minHeight: 38,
    paddingLeft: spacing('100'),
  },
  multiValue: {
    borderRadius: spacing('025'),
    backgroundColor: color.background.badge.default,
    paddingLeft: spacing('025'),
  },
  multiValueDisabled: {
    backgroundColor: '#FFFFFF',
    borderColor: color.border['plain-grey'],
    borderWidth: 1,
    borderRadius: spacing('025'),
    borderStyle: 'solid',
    paddingLeft: spacing('025'),
    paddingRight: spacing('025'),
  },
  multiValueRemoveHover: {
    backgroundColor: color.background.button.secondary.hover,
    cursor: 'pointer',
  },
  multiValueRemoveDisabled: {
    display: 'none',
  },
  dropdownIndicator: {
    padding: spacing('025'),
  },
  dropdownIndicatorDisabled: {
    display: 'none',
  },
  indicatorSeparatorDisabled: {
    display: 'none',
  },
  clearIndicator: {
    padding: spacing('025'),
  },
}));
