import { makeStyles } from '@alveole/theme';

export const useStyles = makeStyles(({ color, spacing, spacingValue }) => ({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.border['contrast-grey'],
    padding: spacing('200'),
    borderRadius: 8,
    backgroundColor: color.alpha(color.background['alt-grey'], 0.3),
    cursor: 'pointer',
  },
  containerHover: {
    borderStyle: 'solid',
    borderColor: color.border['disabled-grey'],
    backgroundColor: color.alpha(color.background['alt-grey'], 0.25),
  },
  containerMouseHover: {
    borderStyle: 'dashed',
    borderColor: color.border['contrast-grey'],
    backgroundColor: color.alpha(color.background['alt-grey'], 0.75),
  },
  containerError: {
    borderStyle: 'dashed',
    borderColor: color.alpha(color.border['plain-error'], 0.5),
    backgroundColor: color.alpha(color.background['alt-grey'], 0.25),
  },
  webError: {
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    color: color.text.mention,
    backgroundColor: color.background['alt-grey'],
    padding: spacing('100'),
    borderRadius: 12,
    width: spacingValue('200'),
    height: spacingValue('200'),
    marginBottom: spacing('100'),
  },
  filesListContainer: {
    marginTop: spacing('100'),
  },
  filesListHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing('050'),
  },
  filesListTitle: {
    fontWeight: 'bold',
  },
  filesListBox: {
    borderWidth: 1,
    borderColor: color.border['default-grey'],
    borderRadius: 8,
    padding: spacing('050'),
    backgroundColor: color.background.default,
  },
  fileItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing('050'),
    padding: spacing('050'),
    marginBottom: spacing('025'),
    backgroundColor: color.background['alt-grey'],
    borderRadius: 8,
  },
  fileItemContainerLast: {
    marginBottom: 0,
  },
  fileIcon: {
    color: color.text['default-error'],
  },
  fileInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing('025'),
  },
  fileName: {
    fontWeight: 'bold',
  },
  fileSize: {
    fontSize: 12,
    color: color.text['default-grey'],
  },
}));
