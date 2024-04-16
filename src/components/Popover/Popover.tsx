import { Children, cloneElement, ReactElement, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { cn, hasProp, PopoverPlacement, PopoverVariant, useOnClickOutside } from '@common';
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
  const refTriggerNode = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<boolean>(isOpen);
  const popoverMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(popoverMenuRef, () => setOpen(false));

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
  const { styles, attributes, forceUpdate } = usePopper(refTriggerNode.current, popoverElement as HTMLElement, {
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

  const handleForceUpdate = () => {
    let timeout: ReturnType<typeof setTimeout>;
    if (forceUpdate) timeout = setTimeout(() => forceUpdate());
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    setOpen(isOpen);
    handleForceUpdate();
  }, [isOpen]);

  useEffect(() => {
    handleForceUpdate();
  }, [open]);

  const handleTriggerClick = (): void => setOpen(!open);

  const child = Children.only(children) as ReactElement;

  /* Append handle to the trigger component */
  const element = hasProp(child.props, 'onClick')
    ? cloneElement(child, { ref: refTriggerNode })
    : cloneElement(child, { ref: refTriggerNode, onClick: handleTriggerClick });

  return (
    <>
      {element}
      <Portal>
        <div role={role} className={classes.menu} ref={setPopoverElement} style={menuStyles} {...attributes.popper}>
          <div ref={popoverMenuRef}>{content}</div>
        </div>
      </Portal>
    </>
  );
};
