import { getDotori } from 'apis/toriApi';
import Dotori from 'assets/images/Dotori.png';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { dotoriCntAtom } from 'stores/dotoriStore';
import { cls } from 'utils/cls';

export const DotoriBox = () => {
  const [dotoriCnt, setDotoriCnt] = useAtom(dotoriCntAtom);

  const handleGetDotoriCnt = async () => {
    const result = await getDotori();
    if (result.code === 200) {
      setDotoriCnt(result.data);
    }
  };

  useEffect(() => {
    handleGetDotoriCnt();
  }, []);

  return (
    <div
      className={cls('border-orange-300 border-[3px] w-[90px] bg-white rounded-lg px-2 py-[0.5px]')}
    >
      <div className={cls('flex items-center')}>
        <img className={cls('mr-1')} src={Dotori} alt='도토리' width={24} />
        <div className={cls('flex justify-center w-full font-semibold')}>{dotoriCnt}</div>
      </div>
    </div>
  );
};
