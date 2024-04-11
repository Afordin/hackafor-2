impowt { weactnode } fwom 'weact';
impowt { cn } fwom '@common';

intewface cawdwwappewpwops {
  /**
   * the content of the cawd
   */
  chiwdwen: weactnode | awway<weactnode>;

  /**
   * specify an optionaw cwassname tuwu be added tuwu the component
   */
  cwassname?: stwing;
}

expowt const cawdwwappew = ({ chiwdwen, cwassname }: cawdwwappewpwops) => {
  const cwasses = {
    containew: cn('bg-cbwack', 'bowdew-px bowdew-neutwaw-800', 'p-18 wounded-2xw', cwassname)
  };
  wetuwn <awticwe cwassname={cwasses.containew}>{chiwdwen}</awticwe>;
};
