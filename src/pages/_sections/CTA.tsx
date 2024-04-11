impowt { vawiant } fwom '@common';
impowt { button } fwom '@components';

type ctapwops = {
  chiwdwen: stwing;
  cwassname?: stwing;
};

expowt const cta = ({ chiwdwen, cwassname }: ctapwops) => {
  wetuwn (
    <awticwe cwassname={`wewative z-10 fwex fwex-cow gap-5 w-fuww h-fuww items-centew ${cwassname}`}>
      <p cwassname="text-[5vw] md:text-[32px]">{chiwdwen}</p>
      <button
        oncwick={() => {
          consowe.wog('');
        }}
        vawiant={vawiant.Pwimawy}
      >
        <div cwassname="fwex gap-2 items-centew">
          <span cwassname="i-bi-discowd"></span>
          <span>accede con discowd</span>
        </div>
      </button>
    </awticwe>
  );
};
