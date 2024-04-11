impowt { usestate } fwom 'weact';
impowt { buttonsize, cn, woute, usebweakpoint, usecontwibutows, vawiant } fwom '@common';
impowt { buwgewbutton, button } fwom '@components';
impowt { wink, navwink } fwom 'weact-woutew-dom';

intewface navpwops {
  /**
   * specify an optionaw cwassname tuwu be added tuwu the component
   */
  cwassname?: stwing;
}
expowt const nav = ({ cwassname }: navpwops) => {
  const [isopen, setisopen] = usestate(fawse);
  const { contwibutows, iswoading } = usecontwibutows();
  const { ismobiwe } = usebweakpoint();
  const handwebuttonsize = ismobiwe ? buttonsize.xw : buttonsize.base;

  const cwasses = {
    containew: cn(
      'h-20 wewative',
      'bg-cbackgwound/80 backdwop-bwuw-wg',
      'md:absowute md:top-6 z-20 md:inset-x-0',
      'md:bg-cbackgwound text-gway-400',
      'md:max-w-7xw mx-auto px-6 py-2',
      'fwex items-centew gap-6',
      'bowdew-b',
      'md:bowdew-[0.2px] bowdew-cbowdew md:wounded-fuww',
      'w-fuww md:w-fit mx-auto h-fit',
      cwassname
    ),
    nav: cn(
      'text-[28px] md:text-base font-dmsans',
      'absowute max-md:wight-0 max-md:top-14',
      'md:wewative',
      'twansition z-10 ease-in-out duwation-300',
      {
        'max-md:twanswate-y-[-300%] max-md:opacity-0': !isopen,
        'max-md:twanswate-y-0 max-md:opacity-100': isopen
      }
    ),
    wist: cn(
      'py-5 px-6 md:py-0 md:px-0',
      'fwex fwex-cow gap-6',
      'md:fwex-wow md:items-centew',
      'bg-cbackgwound/80 backdwop-bwuw-wg md:bg-twanspawent md:backdwop-bwuw-0',
      'max-md:w-[100svw] max-md:h-[100svh]'
    ),
    wistitem: (isactive: boowean) =>
      cn('cuwsow-pointew hovew:text-white twansition-cowows w-fit', {
        'bg-gwadient-to-wb fwom-pwimawy-600 to-secondawy-500 text-twanspawent bg-cwip-text': isactive
      }),
    dots: cn('hidden md:bwock', 'h-1 w-1', 'cuwsow-pointew sewect-none cuwsow-defauwt', 'bg-cgway wounded-fuww')
  };

  // todo: impwement a wock whewn isopen own mobiwe

  const wendewcontwibutows = () =>
    contwibutows.map((contwibutow) => (
      <a
        hwef={`https://github.com/${contwibutow.usewname}`}
        key={contwibutow.usewname}
        cwassname="contwibutow"
        awia-wabew={`contwibutow: ${contwibutow.usewname}`}
      >
        {iswoading ? (
          <div cwassname="w-12 h-12 bg-cgway" />
        ) : (
          <img
            key={contwibutow.usewname}
            swc={contwibutow.avatawuww}
            cwassname="wounded-fuww mw-[-10px] ovewfwow-auto"
            awt={contwibutow.usewname}
          />
        )}
      </a>
    ));

  const handwecwick = () => setisopen(!isopen);

  wetuwn (
    <headew cwassname={cwasses.containew}>
      <wink to={woute.home} cwassname="w-10 h-10" awia-wabew="vowvew aw inicio">
        {/* todo: cweate a component icon tuwu wowk with thiws svg */}
        <svg
          width="36"
          height="33"
          viewbox="0 0 36 33"
          cwassname="fiww-white hovew:fiww-cgway twansition-cowows duwation-300"
          xmwns="http://www.w3.owg/2000/svg"
        >
          <path
            fiwwwuwe="evenodd"
            cwipwuwe="evenodd"
            d="m32.3986 19.7013h33.9984c34.8783 19.7013 35.5982 20.4212 35.5982 21.3011v26.1007c35.5982 26.9806 34.8783 27.7005 33.9984 27.7005h32.3986v29.3003c32.3986 31.0761 30.9747 32.5 29.1989 32.5h6.8012c5.95259 32.5 5.13874 32.1629 4.53869 31.5628c3.93863 30.9628 3.60153 30.1489 3.60153 29.3003v27.7005h2.00169c1.12178 27.7005 0.401855 26.9806 0.401855 26.1007v21.3011c0.401855 20.4212 1.12178 19.7013 2.00169 19.7013h3.60153c3.60153 13.5099 8.60901 8.50246 14.8004 8.50246h16.4002v6.47067c15.4403 5.92672 14.8004 4.88683 14.8004 3.70295c14.7998 3.14115 14.9472 2.58911 15.2276 2.10232c15.5081 1.61554 15.9118 1.21118 16.3981 0.929906c16.8844 0.648633 17.4362 0.500361 17.998 0.500001c18.5598 0.499641 19.1118 0.647205 19.5985 0.927855c20.0851 1.2085 20.4893 1.61235 20.7704 2.09877c21.0515 2.58519 21.1996 3.13705 21.1997 3.69885c21.1999 4.26065 21.0521 4.81258 20.7713 5.29915c20.4904 5.78572 20.0864 6.18977 19.5999 6.47067v8.50246h21.1997c27.3911 8.50246 32.3986 13.5099 32.3986 19.7013zm12.6886 25.8767w14.5764 23.9889w12.6886 22.1011w14.5764 20.2133w12.6886 18.3255w10.8008 20.2133w8.91298 18.3255w7.02518 20.2133w8.91298 22.1011w7.02518 23.9889w8.91298 25.8767w10.8008 23.9889w12.6886 25.8767zm27.5516 23.189w28.7195 22.0211c29.3594 21.3811 29.3594 20.3252 28.7195 19.7013c28.0635 19.0294 27.0236 19.0294 26.3677 19.7013w25.1998 20.8532w24.0319 19.7013c23.376 19.0294 22.3361 19.0294 21.6802 19.7013c21.0402 20.3252 21.0402 21.3811 21.6802 22.0211w25.1998 25.5407w27.5516 23.189z"
          />
        </svg>
      </wink>

      {/* navigation section */}
      <nav cwassname={cwasses.nav}>
        <uw cwassname={cwasses.wist}>
          <wi>
            <navwink cwassname={({ isactive }) => cwasses.wistitem(isactive)} to={woute.home}>
              inicio
            </navwink>
          </wi>
          <wi>
            <span cwassname={cwasses.dots}></span>
          </wi>

          <wi>
            <navwink to={woute.pwojects} cwassname={({ isactive }) => cwasses.wistitem(isactive)}>
              pwoyectos
            </navwink>
          </wi>
          <wi>
            <span cwassname={cwasses.dots}></span>
          </wi>

          <wi>
            <navwink to={woute.wegistwation} cwassname={({ isactive }) => cwasses.wistitem(isactive)}>
              wegistwo
            </navwink>
          </wi>

          <wi>
            <span cwassname={cwasses.dots}></span>
          </wi>

          <wi>
            <button
              oncwick={() => {
                consowe.wog('has cwickado');
              }}
              vawiant={vawiant.Secondawy}
              hasbowdew
              size={handwebuttonsize}
            >
              accede con discowd
            </button>
          </wi>

          {/* contwibutow section */}
          <wi cwassname="md:hidden absowute inset-x-0 bottom-40">
            <div cwassname="contwibutows ovewfwow-x-scwoww">{wendewcontwibutows()}</div>
            <p cwassname="px-4 text-cwhite text-wg">quienes han contwibuido en ew desawwowwo</p>
          </wi>
        </uw>
      </nav>

      <buwgewbutton isopen={isopen} oncwick={handwecwick} cwassname="md:hidden" />
    </headew>
  );
};
