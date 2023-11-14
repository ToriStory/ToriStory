import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Button, IconButton } from '@mui/material';
import { getUserInfoAPI, signOutAPI } from 'apis/user';
import { useNavigate } from 'react-router-dom';
import { myToriPage, updateUserInfoPage } from 'constants/pathname';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { updateToast } from 'utils/toast';
import { PenSquare } from 'lucide-react';
import { orange400 } from 'constants/color';

const UserInfo = () => {
  const { data } = useSWR('/api/member', getUserInfoAPI);
  const navigate = useNavigate();
  const signOut = async () => {
    const signOutToastId = toast.loading('로그아웃 중입니다');
    const res = await signOutAPI();
    if (res.status === 200) {
      updateToast(signOutToastId, '로그아웃에 성공했습니다!', 'success');
      localStorage.removeItem('accessToken');
      navigate(myToriPage.path, { replace: true });
    } else {
      updateToast(signOutToastId, '로그아웃에 실패했습니다', 'error');
    }
  };
  return (
    data &&
    data.data && (
      <Card style={{ width: '100%', borderRadius: '0.6rem' }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{
                width: 100,
                height: 100,
                objectFit: 'contain',
                padding: '4px',
                borderColor: orange400,
                borderWidth: 1,
              }}
              variant='rounded'
              src={data.data.imgUrl}
            />
          }
          action={
            <IconButton
              onClick={() => {
                navigate(updateUserInfoPage.path);
              }}
            >
              <PenSquare />
            </IconButton>
          }
          title={data?.data.nickname}
          subheader={
            <div className='w-full h-full flex flex-col justify-between items-baseline text-justify'>
              <div>{data?.data.email}</div>
              <Button variant='outlined' size='small' sx={{ padding: 0 }} onClick={signOut}>
                로그아웃
              </Button>
            </div>
          }
        />
      </Card>
    )
  );
};

export default UserInfo;
