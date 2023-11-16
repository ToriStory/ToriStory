import { getUserInfoAPI } from 'apis/user';
import { useEffect } from 'react';
import { cls } from 'utils/cls';
import DefaultSquirrel from 'assets/images/DefaultSquirrel.png';
import { useAtom } from 'jotai';
import { profileToriImgUrlAtom } from 'stores/dotoriStore';
import { firework } from 'hooks/useFallingLeaves';

export const ToriSquirrel = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [imgUrl, setImgUrl] = useAtom(profileToriImgUrlAtom);

  const handleGetUserInfo = async () => {
    if (accessToken) {
      const result = await getUserInfoAPI();
      setImgUrl(result.data.imgUrl);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  const handleFallLeaves = () => {
    firework();
  };

  return (
    <div className={cls('pb-2')}>
      <img
        src={accessToken ? imgUrl : DefaultSquirrel}
        alt='다람쥐'
        className={cls('h-24')}
        onClick={() => handleFallLeaves()}
      />
    </div>
  );
};
