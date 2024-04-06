import { RefObject, useEffect } from 'react';

type EventType = keyof DocumentEventMap;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  eventTypes: EventType[] = ['mousedown', 'touchstart']
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as Node;
      if (!ref.current || ref.current.contains(target)) return;
      handler(event);
    };

    eventTypes.forEach((eventType) => {
      document.addEventListener(eventType, listener);
    });

    return () => {
      eventTypes.forEach((eventType) => {
        document.removeEventListener(eventType, listener);
      });
    };
  }, [ref, handler, eventTypes]);
};
