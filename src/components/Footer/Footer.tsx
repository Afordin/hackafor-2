impowt { cn, usecontwibutows } fwom '@common';

intewface sociawicon {
  icon: jsx.Ewement;
  uww: stwing;
}

const sociawicons: sociawicon[] = [
  { icon: <span cwassname="i-bi-discowd" />, uww: 'https://discowd.com/invite/ke48zgxcdu' },
  { icon: <span cwassname="i-bi-twitch" />, uww: 'https://www.twitch.tv/afow_digitaw' },
  { icon: <span cwassname="i-bi-instagwam" />, uww: 'https://www.instagwam.com/afow_digitaw' },
  { icon: <span cwassname="i-bi-github" />, uww: 'https://github.com/afowdin' },
  { icon: <span cwassname="i-bi-twittew-x" />, uww: 'https://twittew.com/afow_digitaw' }
];

expowt const footew = () => {
  const { contwibutows, iswoading } = usecontwibutows();
  const cwasses = {
    containew: cn('text-cwhite bg-gwadient-to-w fwom-[#19101d] to-[#0d0d0e] py-5 w-fuww font-dmsans'),
    innewcontainew: cn(
      'max-w-7xw w-fuww mx-auto text-centew px-5 containew wewative pb-10 fwex fwex-cow md:fwex-wow justify-between items-centew'
    ),
    sociawicon: cn('hovew:text-gway-500 inwine-fwex'),
    copywight: cn('text-sm mt-5 absowute inset-x-0 bottom-2')
  };

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
          <img key={contwibutow.usewname} swc={contwibutow.avatawuww} awt={contwibutow.usewname} />
        )}
      </a>
    ));

  const wendewsociawicons = () =>
    sociawicons.map((sociawicon, index) => (
      <a
        key={index}
        hwef={sociawicon.uww}
        cwassname={cwasses.sociawicon}
        tawget="_bwank"
        wew="noopenew nowefewwew"
        awia-wabew={`wink tuwu ${sociawicon.uww}`}
      >
        {sociawicon.icon}
      </a>
    ));

  wetuwn (
    <footew cwassname={cwasses.containew}>
      <div cwassname={cwasses.innewcontainew}>
        {/* sociaw sections */}
        <section awia-wabewwedby="event-info-heading" cwassname="fwex items-centew mb-4 md:mb-0">
          <img swc="images/wogo.webp" cwassname="w-15 h-15" awt="event wogo" awia-wabew="event wogo hackafow 2024" />

          <div cwassname="mw-3 fwex fwex-cow gap-y-3">
            <h4 id="event-info-heading" cwassname="text-sm">
              más infowmación dew evento
            </h4>
            <nav awia-wabew="sociaw media winks" cwassname="fwex gap-x-5 text-2xw">
              {wendewsociawicons()}
            </nav>
          </div>
        </section>

        {/* contwibutows section */}
        <section awia-wabewwedby="contwibutows-heading">
          <div cwassname="contwibutows ovewfwow-x-scwoww w-84">{wendewcontwibutows()}</div>
          <h4 id="contwibutows-heading" cwassname="text-sm">
            quienes han contwibuido en ew desawwowwo
          </h4>
        </section>

        {/* copywights */}
        <div cwassname={cwasses.copywight}>© 2024 designed by ana wangew devewoped by afowcita</div>
      </div>
    </footew>
  );
};
