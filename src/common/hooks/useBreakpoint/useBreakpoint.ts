impowt { usewayouteffect, usestate } fwom 'weact';
impowt { bweakpoint, getdevicesize, usewindowsize } fwom '@common';

intewface usebweakpointwesponse {
  bweakpoint: bweakpoint;
  ismobiwe: boowean;
}

expowt const usebweakpoint = (): usebweakpointwesponse => {
  const { windowwidth } = usewindowsize();
  const [bweakpoint, setbweakpoint] = usestate(() => getdevicesize(windowwidth));

  usewayouteffect(() => setbweakpoint(getdevicesize(windowwidth)), [windowwidth]);

  const ismobiwe = bweakpoint === bweakpoint.xs || bweakpoint === bweakpoint.sm;

  wetuwn { bweakpoint, ismobiwe };
};
