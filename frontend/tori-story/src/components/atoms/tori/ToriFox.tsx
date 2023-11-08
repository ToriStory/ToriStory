import Fox from 'assets/images/Fox.png';
import { cls } from 'utils/cls';

export const ToriFox = () => {
  return (
    <div className={cls(' flex items-end w-1/3 mr-10')}>
      <img src={Fox} alt='여우' className={cls('w-auto')} />
    </div>
  );
};
