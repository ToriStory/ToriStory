import Dotori from 'assets/images/Dotori.png';
import { cls } from 'utils/cls';

export const DotoriBox = () => {
  return (
    <div className={cls('border-orange-300 border-2 w-[90px] bg-white rounded-lg px-2 py-[0.5px]')}>
      <div className={cls('flex items-center')}>
        <img className={cls('mr-1')} src={Dotori} alt='도토리' width={24} />
        <div className={cls('flex justify-center w-full')}>34</div>
      </div>
    </div>
  );
};
