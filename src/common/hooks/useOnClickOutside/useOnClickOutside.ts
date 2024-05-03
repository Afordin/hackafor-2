import { RefObject, useEffect, useRef } from 'react';

type Event = MouseEvent | TouchEvent;

type HandlerType = {
  event: Event;
  isSameTrigger: boolean;
};

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<HTMLElement> | HTMLElement | null,
  handler: (params: HandlerType) => void
) => {
  const trigger = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;

    const listener = (event: Event) => {
      const target = event.target as Node;
      const element = ref instanceof HTMLElement ? ref : ref.current;

      if (!element) return;
      if (!element || element.contains(target)) return;

      handler({ event, isSameTrigger: Boolean(trigger.current?.contains(target)) });
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [trigger, ref, handler]);

  return trigger;
};
