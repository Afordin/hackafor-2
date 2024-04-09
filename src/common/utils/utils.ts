import { Breakpoint } from '@common';

export const getDeviceSize = (width: number): Breakpoint => {
  if (width < 640) return Breakpoint.xs;
  if (width >= 640 && width < 768) return Breakpoint.sm;
  if (width >= 768 && width < 1024) return Breakpoint.md;
  if (width >= 1024 && width < 1280) return Breakpoint.lg;
  if (width >= 1280 && width < 1536) return Breakpoint.xl;
  return Breakpoint['2xl'];
};

/**
 * hasProp
 * @description - validate if an object has the prop passed arg
 * @function
 * @param {any} obj - Object to validate
 * @param {string} prop - prop's key to check if it belongs to the obj
 * @return {boolean} The obj does has the prop.
 */
export const hasProp = (obj = {}, prop: string): boolean => {
  if (obj === null || typeof obj !== 'object') return false;
  return prop in obj;
};
