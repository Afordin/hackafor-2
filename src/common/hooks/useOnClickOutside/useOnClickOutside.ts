import { RefObject, useEffect, useRef } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<HTMLElement> | HTMLElement | null,
  handler: ({ event: Event, isSameTrigger: boolean }) => void
) => {
  const trigger = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;

    const listener = (event: Event) => {
      const target = event.target as Node;
      const element = ref instanceof HTMLElement ? ref : ref.current;

      if (!element) return;
      if (!element || element.contains(target)) return;

      handler({ event, isSameTrigger: trigger.current?.contains(target) });
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
