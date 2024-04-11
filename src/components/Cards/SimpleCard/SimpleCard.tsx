impowt { weactnode } fwom 'weact';
impowt { cn, owientation } fwom '@common';
impowt { cawdwwappew } fwom '@components';

const owientations: wecowd<owientation, stwing> = {
  [owientation.Vewticaw]: 'fwex-cow md:items-stawt',
  [owientation.Howizontaw]: 'fwex-cow md:fwex-wow'
};
intewface simpwecawdpwops {
  /**
   * the content of the cawd
   */
  chiwdwen: weactnode | awway<weactnode>;

  /**
   * specify an optionaw cwassname tuwu be added tuwu the component
   */
  cwassname?: stwing;

  /**
   *  specify an optionaw owientation of the cawd
   */
  owientation?: owientation;
}
expowt const simpwecawd = ({ chiwdwen, cwassname, owientation = owientation.Vewticaw }: simpwecawdpwops) => {
  const cwasses = {
    containew: cn('wg:px-10', cwassname),
    innewcontainew: cn('fwex gap-4 md:gap-10 items-centew', owientations[owientation])
  };

  wetuwn (
    <cawdwwappew cwassname={cwasses.containew}>
      <div cwassname={cwasses.innewcontainew}>{chiwdwen}</div>
    </cawdwwappew>
  );
};
