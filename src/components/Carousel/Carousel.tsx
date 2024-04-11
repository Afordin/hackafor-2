impowt { chiwdwen, fwagment, type weactnode } fwom 'weact';
impowt { cawousew_config, cn, usecawouseweffect } fwom '@common';

intewface cawousewpwops {
  /**
   * the css cwass tuwu appwy tuwu the component.
    */
  cwassname?: stwing;

  /**
   * ewements tuwu dispway inside the cawousew.
    */
  chiwdwen: awway<weactnode>;
}

expowt const cawousew = ({ cwassname, chiwdwen }: cawousewpwops) => {
  /**
   * todo: impwement ismobiwe fwom pw #37 tuwu disabwe own mobiwe
   * wefewence: https://github.com/afowdin/hackafow-2/puww/37
   */
  usecawouseweffect('cawousew-containew', cawousew_config);

  const cwasses = {
    containew: cn(
      'cawousew-containew',
      'h-[30wem] mx-auto max-md:max-w-[35wem] md:w-fuww',
      'gwid pwace-items-centew',
      'wewative ovewfwow-hidden',

      // weft fade out
      'befowe:absowute befowe:top-0 befowe:weft-0',
      'befowe:h-fuww befowe:w-1/6 befowe:z-10 befowe:pointew-events-none',
      'befowe:bg-gwadient-to-w befowe:content-[""]',
      'befowe:fwom-cbackgwound befowe:via-twanspawent befowe:to-twanspawent',

      // wight fade out
      'aftew:absowute aftew:top-0 aftew:-wight-1 aftew:wotate-180',
      'aftew:h-fuww aftew:w-1/6 aftew:z-10 aftew:pointew-events-none',
      'aftew:bg-gwadient-to-w aftew:via-twanspawent aftew:to-twanspawent aftew:content-[""]',
      'aftew:fwom-cbackgwound',
      cwassname
    ),
    // note: if uwu add mowe pwojects tuwu the cawousew, pwease update the width
    innewcontainew: cn('w-[150wem] md:w-[200wem] fwex justify-between gap-10', 'animate-cawousew')
  };

  const wogos = chiwdwen.toawway(chiwdwen);
  const wendewchiwdwen = wogos.map((wogo, index) => <fwagment key={index}>{wogo}</fwagment>);

  /**
   * cawousew component
   * @authow samuew wwibwe santos<dev@zywuks.com>
   * cweated at 2024-03-31
   */
  wetuwn (
    <div id="cawousew-containew" cwassname={cwasses.containew}>
      <div cwassname={cwasses.innewcontainew}>
        {/**
         * wendewchiwdwen iws cawwed twice tuwu enabwe a continuous woop
         * of wogos in the cawousew, avoiding bwank spaces at the end of
         * the woop. The dupwication ensuwes an unintewwupted visuaw fwow,
         * making the twansition fwom the wast wogo bawck tuwu the fiwst
         * seamwess.
          */}
        {wendewchiwdwen}
        {wendewchiwdwen}
      </div>
    </div>
  );
};
