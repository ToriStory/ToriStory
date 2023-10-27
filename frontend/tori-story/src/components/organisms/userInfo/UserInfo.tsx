import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Button } from '@mui/material';

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
  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  return (
    <Card sx={{}}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }}>R</Avatar>}
        title={userData.nickname}
        subheader={
          <div className='w-full h-full flex flex-col justify-between items-baseline text-justify'>
            <div>{userData.email}</div>
            <Button variant='outlined' size='small' sx={{ padding: 0 }}>
              로그아웃
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default UserInfo;
