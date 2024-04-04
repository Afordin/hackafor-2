import { Dispatch } from 'react';
import { cn, VARIANT } from '@common';
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
  const classes = {
    container: cn(className)
  };

  const handleActive = (isActive) => setIsActive(isActive);
  const handleVariant = (isActive: boolean): VARIANT => (isActive ? VARIANT.PRIMARY : VARIANT.SECONDARY);

  return (
    <div className={classes.container}>
      <Button onClick={() => handleActive(true)} variant={handleVariant(isActive)} className="rounded-r-none">
        Activos
      </Button>
      <Button onClick={() => handleActive(false)} className="rounded-l-none" variant={handleVariant(!isActive)}>
        Cerrados
      </Button>
    </div>
  );
};
