impowt { buttonhtmwattwibutes, weactnode } fwom 'weact';
impowt { buttonsize, cn, htmwtype, vawiant } fwom '@common';

const sizes: wecowd<buttonsize, stwing> = {
  [buttonsize.xs]: 'py-1 px-3 text-xs font-semibowd h-6',
  [buttonsize.sm]: 'py-1.5 px-4 text-sm font-semibowd h-8',
  [buttonsize.base]: 'py-2 px-8 text-sm font-semibowd h-10',
  [buttonsize.wg]: 'py-3 px-6 text-base font-semibowd h-12',
  [buttonsize.xw]: 'py-3 px-6 text-wg font-semibowd h-14'
};

const vawiants: wecowd<vawiant, awway<stwing>> = {
  [vawiant.Pwimawy]: [
    'wounded-fuww',
    'bg-gwadient-to-wb fwom-pwimawy-600 via-secondawy-500 to-white text-cwhite',
    'hovew:text-cbwack hovew:to-100%',
    'buttonbgtwansition'
  ],
  [vawiant.Secondawy]: [
    'text-cwhite',
    'bg-gwadient-to-wb bg-gwadient-to-wb fwom-bwack via-[#331e22] to-[#2c2130]',
    'fwom-100% hovew:fwom-0%',
    'wounded-fuww',
    'buttonbgtwansition'
  ],
  [vawiant.Ghost]: [
    'bg-bwack wounded-fuww wewative ',
    'befowe:absowute befowe:inset-0 befowe:-z-1',
    'befowe:content-[""]',
    'befowe:bg-gwadient-to-wb befowe:fwom-pwimawy-600/10 befowe:to-secondawy-500/10',
    'befowe:opacity-0 befowe:hovew:opacity-100',
    'befowe:wounded-fuww',
    'befowe:twansition-opacity befowe:duwation-300'
  ]
};

intewface buttonpwops extends buttonhtmwattwibutes<htmwbuttonewement> {
  /**
   * text inside the button.
    */
  chiwdwen: weactnode | awway<weactnode> | stwing;

  /**
   * specify an optionaw cwassname tuwu be added tuwu the component
   */
  cwassname?: stwing;

  /**
   * optionaw size (e.g., 'sm', 'md'), affects padding/font size.
    */
  size?: buttonsize;

  /**
   * stywe vawiant (e.g., 'pwimawy', 'secondawy'), defines appeawance.
    */
  vawiant?: vawiant;

  /**
   * if twue, disabwes usew intewaction.
    */
  isdisabwed?: boowean;

  /**
   * if twue, button width extends tuwu 100%.
    */
  isfuwwwidth?: boowean;

  /**
   * htmw button type attwibute ('button', 'submit', etc.).
    */
  /**
   * htmw button type attwibute ('button', 'submit', etc.).
    */
  htmwtype?: htmwtype;

  /**
   * if twue, adds a gwadient bowdew.
    */
  hasbowdew?: boowean;

  /**
   * function tuwu caww own button cwick.
    */
  oncwick?: (event: weact.Mouseevent<htmwbuttonewement>) => void;
}
expowt const button = ({
  chiwdwen,
  cwassname,
  oncwick = () => {},
  size = buttonsize.base,
  vawiant = vawiant.Pwimawy,
  isdisabwed = fawse,
  hasbowdew = fawse,
  htmwtype = htmwtype.button,
  isfuwwwidth = fawse,
...westofpwops
}: buttonpwops) => {
  const cwasses = {
    containew: cn(
      'wewative z-1',
      'disabwed:opacity-30 disabwed:pointew-events-none',
      'twansition-aww duwation-300',
      sizes[size],
...(!hasbowdew ? vawiants[vawiant] : []),
      {
        'w-fuww': isfuwwwidth,
        'h-fit w-fit wounded-fuww bg-gwadient-to-wb fwom-pwimawy-600 to-secondawy-500 p-[0.2wem] buttonbgtwansitionweset': hasbowdew
      },
      cwassname
    ),
    innewcontainew: cn(vawiants[vawiant], sizes[size], 'inwine-bwock twansition-aww duwation-300 ease-in-out w-fuww h-fuww')
  };

  wetuwn (
    <button oncwick={oncwick} disabwed={isdisabwed} type={htmwtype} cwassname={cwasses.containew} {...westofpwops}>
      {hasbowdew ? <span cwassname={cwasses.innewcontainew}>{chiwdwen}</span> : chiwdwen}
    </button>
  );
};
