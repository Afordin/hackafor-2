import { Dispatch } from 'react';
import { VARIANT } from '@common';
import { Button } from '@components';

interface ToggleButtonGroupProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Indicates if the button is active
   */
  isActive: boolean;

  /**
   * Sets the state of the button
   */
  setIsActive: Dispatch<boolean>;
}

export const ToggleButtonGroup = ({ className, isActive, setIsActive }: ToggleButtonGroupProps) => {
  const handleActive = (isActive) => setIsActive(isActive);
  const handleButtonVariant = (isActive: boolean): VARIANT => (isActive ? VARIANT.PRIMARY : VARIANT.SECONDARY);

  return (
    <div className={className}>
      <Button onClick={() => handleActive(true)} variant={handleButtonVariant(isActive)} className="rounded-r-none">
        Activos
      </Button>
      <Button onClick={() => handleActive(false)} className="rounded-l-none" variant={handleButtonVariant(!isActive)}>
        Cerrados
      </Button>
    </div>
  );
};
