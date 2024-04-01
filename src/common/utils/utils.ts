import { Breakpoint } from '@common';

export const getDeviceSize = (width: number): Breakpoint => {
  if (width < 640) return Breakpoint.xs;
  if (width >= 640 && width < 768) return Breakpoint.sm;
  if (width >= 768 && width < 1024) return Breakpoint.md;
  if (width >= 1024 && width < 1280) return Breakpoint.lg;
  if (width >= 1280 && width < 1536) return Breakpoint.xl;
  return Breakpoint['2xl'];
};
