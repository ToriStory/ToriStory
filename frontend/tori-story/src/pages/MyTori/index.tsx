import { DotoriBox } from 'components/atoms/box/DotoriBox';
import { ToriFox } from 'components/atoms/tori/ToriFox';
import { ToriSquirrel } from 'components/atoms/tori/ToriSquirrel';
import { MyToriButtons } from 'components/molecules/buttons/MyToriButtons';
import { cls } from 'utils/cls';

const MyTori = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div className='relative h-full w-full'>
      <div className='fixed -z-10 bg-[#fff3ed] inset-0 flex justify-center items-center bg-[url("/removeTree.png")] bg-center bg-no-repeat bg-cover inset-y-16 -bottom-16' />
      {accessToken && <DotoriBox />}
      <MyToriButtons />
      <div className={cls('absolute bottom-0 flex items-end justify-center')}>
        <ToriFox />
        <ToriSquirrel />
      </div>
    </div>
  );
};

export default MyTori;
