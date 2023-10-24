import { Button } from '@mui/material';
import useAppNavigation from 'hooks/useAppNavigation';

const AuthButtons = () => {
  const navigation = useAppNavigation();
  return (
    <div className='flex flex-col gap-2 my-2'>
      <Button
        variant='contained'
        fullWidth
        style={{ color: 'white', fontWeight: 'bold' }}
        onClick={() => navigation.navigateToSignin()}
      >
        로그인
      </Button>
      <Button
        variant='contained'
        fullWidth
        style={{ color: 'white', fontWeight: 'bold' }}
        onClick={() => navigation.navigateToSignup()}
      >
        회원가입
      </Button>
    </div>
  );
};

export default AuthButtons;
