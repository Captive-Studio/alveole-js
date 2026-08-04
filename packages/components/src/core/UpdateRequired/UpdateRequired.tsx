import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../ui/Button';
import { EmptyState } from '../../ui/EmptyState';
import { Box } from '../Box';

export type UpdateRequiredProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onUpdate: () => void;
};

export const UpdateRequired = (props: UpdateRequiredProps) => {
  const { title, description, buttonLabel, onUpdate } = props;
  const { bottom } = useSafeAreaInsets();

  return (
    <Box
      tag="update-required"
      flex={1}
      style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: bottom }}
    >
      <EmptyState
        title={title}
        description={description}
        iconName="RefreshCw"
        actions={<Button variant="primary" title={buttonLabel} onPress={onUpdate} />}
      />
    </Box>
  );
};
