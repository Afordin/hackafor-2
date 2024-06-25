import { useEffect } from 'react';
import { useBreakpoint } from '@common';

interface CarouselConfig {
  /**
   * Distance between center item and others, affects scale/rotation.
   */
  proximity: number;

  /**
   * Spread of items along the carousel axis.
   */
  spread: number;

  /**
   * Blurring effect for items further from the center.
   */
  blur: number;

  /**
   * Space between items.
   */
  gap: number;

  /**
   * Orientation of the carousel (true for vertical).
   */
  vertical: boolean;

  /**
   * Opacity for items further from the center.
   */
  opacity: number;
}

export const useCarouselEffect = (id: string, config: CarouselConfig): void => {
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    const container = document.getElementById(id);
    const cards = document.querySelectorAll('.carousel-custom-border');
    if (!isMobile) {
      const updateCardsStyle = (event: MouseEvent) => {
        cards.forEach((card) => {
          const bounds = card.getBoundingClientRect();
          const isActive = isMouseNearCard(event, bounds, config.proximity);
          setActiveStyle(card, isActive, config.opacity);

          const angle = calculateAngle(event, bounds);
          setRotationAngle(card, angle);
        });
      };

      document.body.addEventListener('pointermove', updateCardsStyle);

      updateContainerStyle(container, config);
      return () => {
        document.body.removeEventListener('pointermove', updateCardsStyle);
      };
    }
  }, [id, config, isMobile]);
};

/**
 * The function `isMouseNearCard` determines if the mouse cursor
 * is near a specified DOM element based on proximity threshold.
 * @param {MouseEvent} event - The `event` parameter is a MouseEvent
 * object representing an event  triggered by a mouse interaction,
 * such as a click or movement.
 * @param {DOMRect} bounds - The `bounds` parameter in the `isMouseNearCard`
 *  function represents the bounding rectangle of a DOM element.
 * It is of type `DOMRect` and contains properties such as `left`,
 * `top`, `right`, and `bottom` that define the position
 * and size of the element on the
 * @param {number} proximity - The `proximity` parameter in the
 *  `isMouseNearCard` function represents the distance within which
 * the mouse cursor is considered to be near the card. If the distance
 * between the mouse cursor and any edge of the card (defined by the `bounds`
 * parameter) is less than or equal to the `proximity` value,
 * @returns The function `isMouseNearCard` returns a boolean value indicating
 * whether the mouse cursor is near a specified card element based
 * on the proximity threshold provided.
 */
function isMouseNearCard(event: MouseEvent, bounds: DOMRect, proximity: number): boolean {
  return (
    event.x > bounds.left - proximity &&
    event.x < bounds.right + proximity &&
    event.y > bounds.top - proximity &&
    event.y < bounds.bottom + proximity
  );
}

/**
 * The function `setActiveStyle` applies an active or inactive
 * style to an element based on a boolean flag and opacity value.
 * @param {Element} element - The `element` parameter is the HTML element to
 *  which you want to apply the active or inactive style
 * based on mouse proximity.
 * @param {boolean} isActive - The `isActive` parameter is a boolean value that
 * indicates whether the element should be considered active or inactive based
 * on some condition, such as mouse proximity.
 * @param {number} opacity - The `opacity` parameter in the `setActiveStyle`
 * function is a number that represents the opacity value to be set for the
 * element. This value will be used to determine the opacity of the element
 * based on its proximity to the mouse cursor.
 */
function setActiveStyle(element: Element, isActive: boolean, opacity: number): void {
  const styleValue = isActive ? '1' : opacity.toString();
  (element as HTMLElement).style.setProperty('--active', styleValue);
}

/**
 * The function calculates the angle between the mouse cursor and the center
 * of a card based on the mouse event and the bounding rectangle of the card.
 * @param {MouseEvent} event - The `event` parameter is a MouseEvent object
 * representing an event that occurs due to user interaction with the document,
 * such as a mouse click or movement.
 * @param {DOMRect} bounds - The `bounds` parameter represents the bounding
 * rectangle of an element in the DOM (Document Object Model). It contains
 * properties like `left`, `top`, `width`, and `height` that define the
 * position and dimensions of the element on the page.
 * @returns The function `calculateAngle` returns the angle in degrees between
 * the mouse position (event) and the center of the card (bounds) based on the
 * angle between the card and the mouse calculation. If the calculated angle
 * is negative, it is adjusted to be within the range of 0 to 360 degrees
 * before being returned.
 */
function calculateAngle(event: MouseEvent, bounds: DOMRect): number {
  const cardCenter = [bounds.left + bounds.width / 2, bounds.top + bounds.height / 2];
  const angle = Math.atan2(event.y - cardCenter[1], event.x - cardCenter[0]) * (180 / Math.PI);
  return angle < 0 ? angle + 360 : angle;
}

/**
 * The function `setRotationAngle` sets a CSS variable for the rotation angle
 * of an element.
 * @param {Element} element - The `element` parameter is the DOM element to
 * which you want to apply a rotation angle.
 * @param {number} angle - The `angle` parameter in the `setRotationAngle`
 * function is a number representing the rotation angle in degrees that you
 * want to set for the specified element.
 */
function setRotationAngle(element: Element, angle: number): void {
  (element as HTMLElement).style.setProperty('--start', (angle + 90).toString());
}

/**
 * The function `updateContainerStyle` updates the CSS custom properties of a
 * given container element based on the provided `CarouselConfig`.
 * @param {HTMLElement | null} container - The `container` parameter is an
 * HTMLElement or null,
 * representing the HTML element that serves as the container for the carousel.
 * @param {CarouselConfig} config - The `config` parameter is an object of type
 * `CarouselConfig` which contains the following properties:
 */
function updateContainerStyle(container: HTMLElement | null, config: CarouselConfig): void {
  if (container) {
    container.style.setProperty('--gap', `${config.gap}`);
    container.style.setProperty('--blur', `${config.blur}`);
    container.style.setProperty('--spread', `${config.spread}`);
    container.style.setProperty('--direction', config.vertical ? 'column' : 'row');
  }
}
