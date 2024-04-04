import { cn } from '@common';

interface BurgerButtonProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Specify if the button is open
   */
  isOpen: boolean;

  /**
   * Function to call on button click.
   */
  onClick: () => void;
}
export const BurgerButton = ({ className, isOpen, onClick }: BurgerButtonProps) => {
  const classes = {
    container: cn(
      'fixed top-0 right-0 overflow-hidden ',
      'w-15 h-20 rounded-[50%]',
      'transition-all duration-300',
      'bg-transparent burger',
      className
    ),
    span: cn(
      // Center Line of the Burger Menu
      'absolute top-[30px] left-4 right-4',
      'h-[3px] rounded-[15px]',
      'block bg-cWhite',
      'transition-all duration-200',
      {
        'bg-[0,0,transparent] rotate-90 transition-all duration-200 ease-in': isOpen
      },

      // Top line of the Burger Menu
      'before:content-[""]',
      'before:absolute before:-top-2 before:left-0 before:content-[""]',
      'before:w-full before-h-[3px] before:block',
      'before:bg-white before:rounded-[15px]',
      'before:transition-all before:duration-300 before:ease-in',

      // Bottom Line of the Burger Menu
      'after:content-[""]',
      'after:absolute after:-bottom-2 after:left-0 ',
      ' after:bg-white after:rounded-[15px]',
      'after:w-full after:h-[3px] after:block',
      'after:transition-all after:duration-300 after:ease-in',
      {
        'before:transition-delay-[0s,.3s] before:top-0 before:rotate-45': isOpen,
        'after:transition-delay-[0s,.3s] after:bottom-px after:-rotate-45': isOpen
      }
    )
  };

  const handleClick = () => onClick();

  return (
    <button className={classes.container} onClick={handleClick} aria-label={isOpen ? 'Close Menu Button' : 'Open Menu Button'}>
      <span className={classes.span}></span>
    </button>
  );
};
