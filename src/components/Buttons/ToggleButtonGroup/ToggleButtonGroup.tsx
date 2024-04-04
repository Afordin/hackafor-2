import { Dispatch } from 'react';
import { ButtonSize, cn, useBreakpoint, VARIANT } from '@common';
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
    container: cn('max-sm:grid max-sm:gap-4 ', className)
  };
  const { isMobile } = useBreakpoint();
  const handleButtonSize = isMobile ? ButtonSize.xl : ButtonSize.xl;
  const handleActive = (isActive) => setIsActive(isActive);
  const handleButtonVariant = (isActive: boolean): VARIANT => (isActive ? VARIANT.PRIMARY : VARIANT.SECONDARY);

  return (
    <div className={classes.container}>
      <Button
        size={handleButtonSize}
        onClick={() => handleActive(true)}
        variant={handleButtonVariant(isActive)}
        className="sm:rounded-r-none max-sm:w-full"
      >
        Activos
      </Button>
      <Button
        size={handleButtonSize}
        onClick={() => handleActive(false)}
        className="sm:rounded-l-none max-sm:w-full"
        variant={handleButtonVariant(!isActive)}
      >
        Cerrados
      </Button>
    </div>
  );
};
