import { ReactNode } from 'react';
import { cn } from '@common';

interface CardWrapperProps {
  /**
   * The content of the card
   */
  children: ReactNode | Array<ReactNode>;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

export const CardWrapper = ({ children, className }: CardWrapperProps) => {
  const classes = {
    container: cn('bg-cBlack', 'border-px border-neutral-800', 'p-18 rounded-2xl', className)
  };
  return <article className={classes.container}>{children}</article>;
};
