import { ToriFox } from 'components/atoms/tori/ToriFox';
import { ToriSquirrel } from 'components/atoms/tori/ToriSquirrel';
import { MyToriButtons } from 'components/molecules/buttons/MyToriButtons';
import { cls } from 'utils/cls';
import { ToriAssetList } from 'components/molecules/toriAssets/ToriAssetList';

const MyTori = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div className='h-full w-full relative'>
      <div className='fixed -z-10 bg-[#fff3ed] inset-0 flex justify-end items-center bg-[url("/removeTree.png")] bg-center bg-no-repeat bg-cover bottom-12' />
      <div className='w-full z-10'>
        {accessToken && <ToriAssetList />}
        <MyToriButtons />
      </div>
      <div className={cls('h-full -z-1 w-full')}>
        <div className={cls('w-full absolute -bottom-1 flex items-end justify-center')}>
          <ToriFox />
          <ToriSquirrel />
        </div>
      </div>
    </div>
  );
};

export default MyTori;
