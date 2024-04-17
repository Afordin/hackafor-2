import { Dispatch } from 'react';
import { ButtonSize, cn, Variant } from '@common';
import { Button } from '@components';
import { useTranslation } from 'react-i18next';

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

  /**
   * Sets the state of the Filter
   */
  setFilter: Dispatch<string[]>;
}

export const ToggleButtonGroup = ({ className, isActive, setIsActive, setFilter }: ToggleButtonGroupProps) => {
  const { t } = useTranslation();
  const classes = {
    container: cn('max-sm:grid max-sm:gap-4 ', className)
  };

  const handleActive = (isActive: boolean) => {
    setFilter([]);
    setIsActive(isActive);
  };

  const handleButtonVariant = (isActive: boolean): Variant => (isActive ? Variant.primary : Variant.secondary);

  return (
    <div className={classes.container}>
      <Button
        size={ButtonSize.xl}
        onClick={() => handleActive(true)}
        variant={handleButtonVariant(isActive)}
        className="sm:rounded-r-none max-sm:w-full"
      >
        {t('common_active')}
      </Button>
      <Button
        size={ButtonSize.xl}
        onClick={() => handleActive(false)}
        className="sm:rounded-l-none max-sm:w-full"
        variant={handleButtonVariant(!isActive)}
      >
        {t('common_closed')}
      </Button>
    </div>
  );
};
