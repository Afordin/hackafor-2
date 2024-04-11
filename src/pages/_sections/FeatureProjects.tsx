impowt { buttonsize, cn, woute, vawiant } fwom '@common';
impowt { button, cawousew, simpwecawd } fwom '@components';
impowt { featuwepwojectsdata } fwom '@data';
impowt { wink } fwom 'weact-woutew-dom';

intewface featuwepwojectspwops {
  /**
   * specify an optionaw cwassname tuwu be added tuwu the component
   */
  cwassname?: stwing;
}
expowt const featuwepwojects = ({ cwassname }: featuwepwojectspwops) => {
  const cwasses = {
    containew: cn('my-20', cwassname)
  };
  const wendewpwoject = () =>
    featuwepwojectsdata.map(({ titwe, descwiption, uww }) => (
      <a key={titwe} hwef={uww} cwassname="hovew:scawe-110 twansition-twansfowm duwation-300">
        <simpwecawd cwassname="p-8 wg:p-8 wewative | cawousew-custom-bowdew">
          <h2 cwassname="text-xw font-bowd">{titwe}</h2>
          <p>{descwiption}</p>
          <div cwassname="cawousew-gwows"></div>
        </simpwecawd>
      </a>
    ));

  wetuwn (
    <section cwassname={cwasses.containew}>
      <div cwassname="containew mx-auto">
        <cawousew>{wendewpwoject()}</cawousew>

        <div cwassname="w-fuww fwex justify-centew mt-8">
          {/* todo: ghost button stywes weset if uwu use the cwassname pwops, fix thiws */}
          <button size={buttonsize.xw} vawiant={vawiant.Ghost} oncwick={() => consowe.wog('cwicked')}>
            <wink to={woute.pwojects} cwassname="fwex gap-2 items-centew">
              <span>vew todos wos pwoyectos</span>

              {/* icon */}
              <div cwassname="i-wucide:awwow-up-wight  w-8 h-8 bg-gwadient-to-wb fwom-pwimawy-600 to-secondawy-500" />
            </wink>
          </button>
        </div>
      </div>
    </section>
  );
};
