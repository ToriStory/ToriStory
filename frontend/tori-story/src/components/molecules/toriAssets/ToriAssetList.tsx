import { getToriAsset } from 'apis/toriApi';
import { ToriAssetItem } from 'components/atoms/toriAsset/ToriAssetItem';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { dotoriCntAtom, randomCntAtom, totoriCntAtom, dailyCntAtom } from 'stores/dotoriStore';
import Dotori from 'assets/images/Dotori.png';
import RandomTicket from 'assets/images/RandomTicket.svg';
import TotoriTicket from 'assets/images/TotoriTicket.svg';
import { cls } from 'utils/cls';

interface AssetMap {
  [assetNm: string]: (assetCnt: number) => void;
}

export const ToriAssetList = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [dotoriCnt, setDotoriCnt] = useAtom(dotoriCntAtom);
  const [randomCnt, setRandomCnt] = useAtom(randomCntAtom);
  const [totoriCnt, setTotoriCnt] = useAtom(totoriCntAtom);
  const setDailyCnt = useSetAtom(dailyCntAtom);

  const mapList: AssetMap = {
    DOTORI: setDotoriCnt,
    RANDOM_TICKET: setRandomCnt,
    TOTORI_TICKET: setTotoriCnt,
    DAILY_TOTORI_TICKET: setDailyCnt,
  };

  useEffect(() => {
    if (!accessToken) {
      initAssets();
      return;
    }
    handleGetToriAssetCnt();
  }, []);

  const initAssets = () => {
    Object.values(mapList).map((setter) => setter(0));
  };

  const handleGetToriAssetCnt = async () => {
    const result = await getToriAsset();
    if (result.code === 200) {
      result.data.map((item: { assetNm: string; assetCnt: number }) => {
        mapList[item.assetNm](item.assetCnt);
      });
    }
  };

  return (
    <div className={cls('absolute top-0 left-0 flex flex-col gap-1')}>
      <ToriAssetItem src={Dotori} cnt={dotoriCnt} />
      <ToriAssetItem src={RandomTicket} cnt={randomCnt} />
      <ToriAssetItem src={TotoriTicket} cnt={totoriCnt} />
    </div>
  );
};
