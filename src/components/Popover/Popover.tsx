import React, { forwardRef, HTMLProps, ReactNode, useContext, useMemo } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole
} from '@floating-ui/react';

interface PopoverProps {
  initialOpen?: boolean;
  className?: string;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePopover({
  initialOpen,
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: PopoverProps = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<string | undefined>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const floatingData = useFloating({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [
      offset(10),
      flip({
        fallbackAxisSideDirection: 'end',
        padding: 5
      }),
      shift({ padding: 5 })
    ]
  });

  const floatingContext = floatingData.context;

  const click = useClick(floatingContext);
  const dismiss = useDismiss(floatingContext);
  const role = useRole(floatingContext);
  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...floatingData,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId
    }),
    [open, setOpen, interactions, floatingData, modal, labelId, descriptionId]
  );
}

type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    })
  | null;

const PopoverContext = React.createContext<ContextType>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const usePopOverContext = () => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('Compontes must be wrapped in <Popover />');
  }

  return context;
};

export const Popover = ({
  children,
  modal = false,
  ...restOptions
}: {
  children: ReactNode;
} & PopoverProps) => {
  const popover = usePopover({ modal, ...restOptions });
  return <PopoverContext.Provider value={popover}>{children}</PopoverContext.Provider>;
};

export const PopoverTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & PopoverTriggerProps>(function PopoverTrigger(
  { children, asChild, ...props },
  propRef
) {
  const context = usePopOverContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows passing any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed'
      })
    );
  }

  return (
    <button ref={ref} type="button" data-state={context.open ? 'open' : 'closed'} {...context.getReferenceProps(props)}>
      {children}
    </button>
  );
});

export const PopoverContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(function PopoverContent({ style, ...props }, propRef) {
  const { context: fltContext, ...context } = usePopOverContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!fltContext.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{ ...context.floatingStyles, ...style }}
        aria-labelledby={context.labelId}
        aria-describedby={context.descriptionId}
        {...context.getFloatingProps(props)}
      >
        {props.children}
      </div>
    </FloatingPortal>
  );
});
