import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@common';

interface CardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the card
   */
  children: ReactNode | Array<ReactNode>;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

export const CardWrapper = ({ children, className, ...restOfProps }: CardWrapperProps) => {
  const classes = {
    container: cn('bg-cBlack', 'border-px border-neutral-800', 'p-[32px] rounded-2xl', className)
  };
  return (
    <article {...restOfProps} className={classes.container}>
      {children}
    </article>
  );
};
