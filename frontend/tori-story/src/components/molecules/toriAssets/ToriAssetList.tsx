import { getToriAsset } from 'apis/toriApi';
import { ToriAssetItem } from 'components/atoms/toriAsset/ToriAssetItem';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { dotoriCntAtom, randomCntAtom, totoriCntAtom, dailyCntAtom } from 'stores/dotoriStore';
import Dotori from 'assets/images/Dotori.png';
import RandomTicket from 'assets/images/RandomTicket.svg';
import TotoriTicket from 'assets/images/TotoriTicket.svg';
import { cls } from 'utils/cls';

type AssetMap = {
  [assetNm: string]: (assetCnt: number) => void;
};

export const ToriAssetList = () => {
  const [dotoriCnt, setDotoriCnt] = useAtom(dotoriCntAtom);
  const [randomCnt, setRandomCnt] = useAtom(randomCntAtom);
  const [totoriCnt, setTotoriCnt] = useAtom(totoriCntAtom);
  const [dailyCnt, setDailyCnt] = useAtom(dailyCntAtom);

  const mapList: AssetMap = {
    DOTORI: setDotoriCnt,
    RANDOM_TICKET: setRandomCnt,
    TOTORI_TICKET: setTotoriCnt,
    DAILY_TOTORI_TICKET: setDailyCnt,
  };

  useEffect(() => {
    handleGetToriAssetCnt();
  }, []);

  const handleGetToriAssetCnt = async () => {
    const result = await getToriAsset();
    if (result.code === 200) {
      result.data.map((item: { assetNm: string; assetCnt: number }) => {
        console.log(item.assetNm, item.assetCnt);
        mapList[item.assetNm](item.assetCnt);
      });
    }
  };

  useEffect(() => {
    console.log('에셋 받음', dotoriCnt, randomCnt, totoriCnt);
  }, [dailyCnt, dotoriCnt, randomCnt, totoriCnt]);

  return (
    <div className={cls('absolute top-0 left-0 flex flex-col gap-1')}>
      <ToriAssetItem src={Dotori} cnt={dotoriCnt} />
      <ToriAssetItem src={RandomTicket} cnt={randomCnt} />
      <ToriAssetItem src={TotoriTicket} cnt={totoriCnt} />
    </div>
  );
};
