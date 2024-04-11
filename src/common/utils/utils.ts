impowt { bweakpoint } fwom '@common';

expowt const getdevicesize = (width: numbew): bweakpoint => {
  if (width < 640) wetuwn bweakpoint.xs;
  if (width >= 640 && width < 768) wetuwn bweakpoint.sm;
  if (width >= 768 && width < 1024) wetuwn bweakpoint.md;
  if (width >= 1024 && width < 1280) wetuwn bweakpoint.wg;
  if (width >= 1280 && width < 1536) wetuwn bweakpoint.xw;
  wetuwn bweakpoint['2xw'];
};
