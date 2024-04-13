import { cn } from '@common';

interface CounterProps {
  /**
   * The role associated with the counter.
   */
  role: string;

  /**
   * The current amount or value of the counter.
   */
  amount: number;

  /**
   * A boolean indicating whether the counter is disabled or not.
   */
  disabled: boolean;

  /**
   * Function to increase the counter's value.
   */
  increase: () => void;

  /**
   * Function to decrease the counter's value.
   */
  decrease: () => void;

  /**
   * Callback function invoked when the counter's value changes.
   * @param value The new value of the counter.
   */
  onChange: (value: any) => void;
}

export const Counter = ({ role, amount, disabled, increase, decrease, onChange }: CounterProps) => {
  const classes = {
    container: cn('flex items-center text-2xl gap-x-2 text-cWhite'),
    counter: cn('flex items-center gap-x-2', 'border border-pBorder', 'p-2 rounded-full', 'transition-colors', {
      'border-secondary-500': amount > 0
    }),
    decreaseButton: cn('i-lucide-minus transition-colors', {
      'text-cDisabled': amount === 0
    }),
    increaseButton: cn('i-lucide-plus transition-colors', {
      'text-cDisabled': disabled
    })
  };
  const handleChange = (newAmount: number) => {
    onChange(newAmount);
  };

  const handleDecrease = () => {
    decrease();
    handleChange(amount - 1);
  };
  const handleIncrease = () => {
    increase();
    handleChange(amount + 1);
  };

  return (
    <div className={classes.container}>
      <span>{role}</span>
      <div className={classes.counter}>
        <button type="button" onClick={handleDecrease} className={classes.decreaseButton} aria-label="Decrease">
          <span aria-hidden="true">-</span>
        </button>
        <span className="text-md" aria-live="polite">
          {amount}
        </span>
        <button type="button" onClick={handleIncrease} className={classes.increaseButton} aria-label="Increase">
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  );
};
