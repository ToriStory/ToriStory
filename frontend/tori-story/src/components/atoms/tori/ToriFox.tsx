import Fox from 'assets/images/Fox.png';
import { cls } from 'utils/cls';

export const ToriFox = () => {
  return (
    <div className={cls('pr-[20%]')}>
      <img src={Fox} alt='여우' className={cls('h-40')} />
    </div>
  );
};
