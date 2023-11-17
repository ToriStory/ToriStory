import { ToriFox } from 'components/atoms/tori/ToriFox';
import { ToriSquirrel } from 'components/atoms/tori/ToriSquirrel';
import { MyToriButtons } from 'components/molecules/buttons/MyToriButtons';
import { cls } from 'utils/cls';
import { ToriAssetList } from 'components/molecules/toriAssets/ToriAssetList';
import Tree from 'assets/images/Tree.png';
import { Tutorial } from 'components/templates/Tutorial';
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const MyTori = () => {
  const [isOpenTutorial, setIsOpenTutorial] = useState(false);

  const handleOpenTutorial = () => {
    setIsOpenTutorial(true);
  };

  const handleCloseTutorial = () => {
    setIsOpenTutorial(false);
  };

  return (
    <div className='h-full w-full relative'>
      {/* <div className='fixed -z-10 bg-[#fff3ed] inset-0 flex justify-end items-center bg-[url("/removeTree.png")] bg-center bg-no-repeat bg-cover bottom-12' /> */}
      <div className='fixed -z-10 bg-[#fff3ed] inset-0 flex justify-end items-center ' />
      <div className='w-full z-10'>
        <ToriAssetList />
        <MyToriButtons />
      </div>
      {!isOpenTutorial && (
        <HelpCircle
          onClick={handleOpenTutorial}
          className='absolute top-[6.5rem] stroke-gray-800'
          size={20}
        />
      )}
      <div className={cls('w-full h-full -z-1')}>
        <div
          className={cls(
            'fixed w-screen h-full bottom-0 left-0 flex items-end justify-cente content -z-10 py-14'
          )}
        >
          <img src={Tree} alt='나무' className={cls('h-full w-full object-cover')} />
        </div>
        <div className={cls('w-full absolute -bottom-3 flex items-end justify-center')}>
          <ToriFox />
          <ToriSquirrel />
        </div>
      </div>
      {isOpenTutorial && <Tutorial onClose={handleCloseTutorial}></Tutorial>}
    </div>
  );
};

export default MyTori;
