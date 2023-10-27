import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';
import { signOutAPI } from 'apis/user';
import { useNavigate } from 'react-router-dom';
import { myToriPage } from 'constants/pathname';
import { toast } from 'react-toastify';

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const userData = {
  nickname: '닉네임',
  email: 'email@email.com',
};
const UserInfo = () => {
  const navigate = useNavigate();
  const signOut = async () => {
    const res = await toast.promise(signOutAPI(), {
      pending: '로그아웃 중입니다',
      success: '로그아웃에 성공했습니다!',
      error: '로그아웃에 실패했습니다',
    });
    if (res.status === 200) {
      localStorage.removeItem('accessToken');
      navigate(myToriPage.path, { replace: true });
    }
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }}>R</Avatar>}
        title={userData.nickname}
        subheader={
          <div className='w-full h-full flex flex-col justify-between items-baseline text-justify'>
            <div>{userData.email}</div>
            <Button variant='outlined' size='small' sx={{ padding: 0 }} onClick={signOut}>
              로그아웃
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default UserInfo;
