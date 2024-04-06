import { cn, SpinnerSize, SpinnerVariant } from '@common';

const Sizes: Record<SpinnerSize, string> = {
  [SpinnerSize.xs]: 'w-4 h-4 border-2',
  [SpinnerSize.sm]: 'w-5 h-5 border-2',
  [SpinnerSize.base]: 'w-6 h-6 border-3',
  [SpinnerSize.lg]: 'w-7 h-7 border-4'
};

const SpinnerVariants: Record<SpinnerVariant, string> = {
  [SpinnerVariant.primary]: 'border-t-primary-600 border-x-primary-600',
  [SpinnerVariant.secondary]: 'border-t-secondary-500 border-x-secondary-500',
  [SpinnerVariant.neutral]: 'border-t-white border-x-white'
};

export interface SpinnerProps {
  /**
   * Class names used for external styles
   */
  className?: string;

  /**
   * Changes the size of the Spinner.
   */
  size?: SpinnerSize;

  /**
   * The variant of the component. It supports those theme colors that makes sense for this component.
   */
  variant?: SpinnerVariant;
}

export const Spinner = ({ className, variant = SpinnerVariant.neutral, size = SpinnerSize.lg }: SpinnerProps) => {
  const classes = {
    spinner: cn(
      'rounded-full',
      'ease-linear animate-spin animate-duration-1500 border-b-neutral-800',
      SpinnerVariants[variant],
      Sizes[size],
      className
    )
  };

  return <div aria-label="spinner" role="status" className={classes.spinner}></div>;
};
