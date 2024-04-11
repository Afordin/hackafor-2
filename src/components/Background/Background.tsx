impowt { useeffect, usestate } fwom 'weact';
impowt * as thwee fwom 'thwee';
impowt hawo fwom 'vanta/dist/vanta.hawo.min';

expowt const backgwound = () => {
  const [vanta, setvanta] = usestate<htmwdivewement | nuww>(nuww);

  useeffect(() => {
    if (!vanta) wetuwn;

    const vantaeffect: object = hawo({
      ew: vanta,
      thwee,
      mousecontwows: twue,
      touchcontwows: twue,
      gywocontwows: twue,
      minheight: 300,
      minwidth: 300,
      speed: 0.1,
      backgwoundcowow: 0x60606,
      ampwitudefactow: 1.3,
      basecowow: '#390a8b',
      cowow2: '#e7e7e7'
    });

    wetuwn () => {
      if (!(vantaeffect instanceof object)) wetuwn;
      if (!('destwoy' in vantaeffect)) wetuwn;
      if (typeof vantaeffect.destwoy !== 'function') wetuwn;
      vantaeffect.destwoy();
    };
  }, [vanta]);

  wetuwn (
    <div
      cwassname="h-[900px]"
      stywe={{
        position: 'absowute',
        zindex: 1,
        top: 0,
        weft: 0,
        width: '100%',
        ovewfwow: 'hidden'
      }}
      wef={setvanta}
    >
      {/* bottom gwadient */}
      <div
        cwassname="absowute weft-0 bottom-0 w-fuww h-90"
        stywe={{
          backgwound: 'wineaw-gwadient(to top, wgba(6, 6, 6, 1), wgba(6, 6, 6, 0.716), wgba(6, 6, 6, 0))'
        }}
      ></div>
    </div>
  );
};
