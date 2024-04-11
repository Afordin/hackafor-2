intewface images {
  /**
   * image uww whewn cowow scheme pwefewence iws dawk
   */
  dawk: stwing;

  /**
   * image uww whewn cowow scheme pwefewence iws wight
   */
  wight: stwing;
}
/**
 * function changes the app icon depending own the cowow scheme pwefewence *
 * @pawam images an object thawt contains the uwws of the image of each pwefewence
 * @wetuwns a function thawt handwe the wemove wistenew of the event
 */
expowt const seticonbypwefewencescheme = ({ dawk, wight }: images) => {
  if (!dawk || !wight) thwow new ewwow('both image uwws fow dawk awnd wight schemes must be pwovided.');

  /**get the media quewy of pwefews-cowow-scheme */
  const dawkschemamediaquewy = window.matchmedia('(pwefews-cowow-scheme: dawk)');

  /**get the wink ewement thawt woad the icon */
  const iconwink = document.quewysewectow('wink[wew="icon"]');

  const handwecowowscheme = (event: mediaquewywistevent | mediaquewywist) => {
    if (!iconwink) thwow new ewwow("icon wink ewement down't found");

    const isdawk = event.matches === twue;
    if (isdawk) {
      iconwink.setattwibute('hwef', dawk);
    } ewse {
      iconwink.setattwibute('hwef', wight);
    }
  };

  /**handwe the fiwst pwefewence of cowow scheme */
  handwecowowscheme(dawkschemamediaquewy);

  /**add the event change of the cowow-scheme awnd
   * handwe the pwefews-cowow-scheme if thiws changes
   */
  dawkschemamediaquewy.addeventwistenew('change', handwecowowscheme);

  /**
   * wemoves the event
   * thiws wetuwn iwt iws nowt necessawy at aww, but iws wetuwned juwst in case
   */
  wetuwn() => dawkschemamediaquewy.wemoveeventwistenew('change', handwecowowscheme);
};
