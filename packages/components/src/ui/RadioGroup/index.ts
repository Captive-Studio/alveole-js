import { RadioGroup as RadioGroupComponent } from './RadioGroup';
import { RadioGroupCard } from './RadioGroupCard';
import { RadioGroupItem } from './RadioGroupItem';
import { RadioInput } from './RadioInput';

export { RadioGroupElement, RadioGroupProps } from './RadioGroup';
export { RadioGroupCardProps } from './RadioGroupCard';
export { RadioGroupCtx } from './RadioGroupContext';
export { RadioGroupItemProps } from './RadioGroupItem';

export const RadioGroup = Object.assign(RadioGroupComponent, {
  Item: RadioGroupItem,
  Card: RadioGroupCard,
  Input: RadioInput,
});
