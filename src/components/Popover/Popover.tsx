import { ReactNode, RefObject, useState } from 'react';
import { cn, PopoverPlacement, PopoverVariant, useOnClickOutside } from '@common';
import { Portal } from '@components';
import { usePopper } from 'react-popper';

const PopoverVariants: Record<PopoverVariant, string> = {
  [PopoverVariant.primary]: 'border border-primary-900 bg-primary-950/50 backdrop-blur-md',
  [PopoverVariant.ghost]: 'border border-neutral-700 bg-neutral-950/50 backdrop-blur-md'
};

export interface PopoverProps {
  /**
   * The content displayed inside the popover.
   */
  content: ReactNode;

  /**
   * When true, the popover is manually shown.
   */
  isOpen?: boolean;

  /**
   * The position (relative to the target) at which the popover should appear.
   */
  placement?: PopoverPlacement;

  /**
   * Specify an optional className to be added to the menu component
   */
  className?: string;

  /**
   * Whether the float menu has the same trigger's width
   */
  menuFullWidth?: boolean;

  /**
   * Specify the role of the popover in order to improve accessibility
   */
  role?: string;

  /**
   * Elements to display inside the Navbar.
   */
  children?: ReactNode;

  /**
   * Style Variant (e.g., 'primary', 'secondary'), defines appearance.
   */
  variant?: PopoverVariant;
}

export const Popover = ({
  content,
  isOpen = false,
  placement = PopoverPlacement.bottom,
  role = 'menu',
  className,
  menuFullWidth = false,
  children,
  variant = PopoverVariant.ghost
}: PopoverProps) => {
  const [popoverElement, setPopoverElement] = useState<RefObject<HTMLElement> | HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(isOpen);

  const refTriggerNode = useOnClickOutside<HTMLDivElement>(popoverElement, ({ isSameTrigger }) => setOpen(isSameTrigger));

  const classes = {
    menu: cn(
      'shadow-lg z-50',
      'rounded-md',
      'p-2 text-sm',
      {
        'opacity-0 invisible': !open,
        'opacity-100 animate-fade-in animate-duration-200': open
      },
      PopoverVariants[variant],
      className
    )
  };

  /* Popper config */
  const { styles, attributes } = usePopper(refTriggerNode.current, popoverElement as HTMLElement, {
    placement,
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'right']
        }
      }
    ]
  });

  const menuStyles = menuFullWidth
    ? {
        ...styles.popper,
        minWidth: refTriggerNode.current?.scrollWidth,
        maxWidth: refTriggerNode.current?.scrollWidth
      }
    : { ...styles.popper };

  const handleTriggerClick = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <div onClick={handleTriggerClick} ref={refTriggerNode}>
        {children}
      </div>

      {open && (
        <Portal>
          <div role={role} className={classes.menu} ref={setPopoverElement} style={menuStyles} {...attributes.popper}>
            <div>{content}</div>
          </div>
        </Portal>
      )}
    </>
  );
};
