import { ReactNode } from 'react';
import { cn, ORIENTATION } from '@common';
import { CardWrapper } from '@components';

const Orientations: Record<ORIENTATION, string> = {
  [ORIENTATION.VERTICAL]: 'flex-col md:items-start',
  [ORIENTATION.HORIZONTAL]: 'flex-col md:flex-row'
};
interface SimpleCardProps {
  /**
   * The content of the card
   */
  children: ReactNode | Array<ReactNode>;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   *  Specify an optional orientation of the card
   */
  orientation?: ORIENTATION;
}
export const SimpleCard = ({ children, className, orientation = ORIENTATION.VERTICAL }: SimpleCardProps) => {
  const classes = {
    container: cn('lg:px-10', className),
    innerContainer: cn('flex gap-4 md:gap-10 items-center ', Orientations[orientation])
  };

  return (
    <CardWrapper className={classes.container}>
      <div className={classes.innerContainer}>{children}</div>
    </CardWrapper>
  );
};
