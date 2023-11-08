import { getUserInfoAPI } from 'apis/user';
import { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import DefaultSquirrel from 'assets/images/DefaultSquirrel.png';

export const ToriSquirrel = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [imgUrl, setImgUrl] = useState('');
  const handleGetUserInfo = async () => {
    if (accessToken) {
      const result = await getUserInfoAPI();
      setImgUrl(result.data.imgUrl);
    }
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return (
    <div className={cls('flex items-end w-1/3')}>
      <img
        src={accessToken ? imgUrl : DefaultSquirrel}
        alt='다람쥐'
        className={cls('w-auto h-2/5 pb-3')}
      />
    </div>
  );
};
