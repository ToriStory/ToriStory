/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { findPasswordPage, myToriPage, signUpPage } from 'constants/pathname';
import { Link, useNavigate } from 'react-router-dom';
import AuthBackground from 'components/atoms/background/AuthBackground';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'components/atoms/input/FormInputText';
import { signInAPI } from 'apis/user';
import { toast } from 'react-toastify';
import { updateToast } from 'utils/toast';

// function Copyright(props: any) {
//   return (
//     <Typography variant='body2' color='text.secondary' align='center' {...props}>
//       {'Copyright © '}
//       <Link color='inherit' href='https://mui.com/'>
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

interface SignInInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInInput) => {
    const signInToastId = toast.loading('로그인 중입니다');
    const fcmToken = localStorage.getItem('fcmToken');
    const res = await signInAPI({
      email: data.email,
      password: data.password,
      fcmToken: fcmToken,
    });
    if (res.status === 200) {
      updateToast(signInToastId, '로그인에 성공했습니다!', 'success');
      localStorage.setItem('accessToken', res.data.data.accessToken);
      navigate(myToriPage.path, { replace: true });
    } else {
      updateToast(signInToastId, '로그인에 실패했습니다!', 'error');
    }
  };

  return (
    <AuthBackground>
      <Container component='main' maxWidth='xs'>
        <div className='bg-[rgba(255,255,255,1)] p-4 rounded-lg drop-shadow-2xl'>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h4'>
              로그인
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
              <FormInputText
                name='email'
                control={control}
                label='이메일'
                margin='normal'
                fullWidth
                type='email'
                id='email'
                autoComplete='email'
                rules={{
                  required: { value: true, message: '이메일을 입력해주세요!' },
                  maxLength: { value: 320, message: '320자 이내로 작성해주세요!' },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: '이메일 형식을 따라 작성해주세요!',
                  },
                }}
                autoFocus
              />
              <FormInputText
                name='password'
                control={control}
                label='비밀번호'
                margin='normal'
                fullWidth
                type='password'
                id='password'
                rules={{
                  required: { value: true, message: '비밀번호를 입력해주세요!' },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/,
                    message: '영어와 숫자, 특수문자를 모두 사용하여 8~20자로 작성해주세요!',
                  },
                }}
              />
              {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='로그인 유지하기'
            /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, fontWeight: 'bold', color: 'white', fontSize: 20 }}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={findPasswordPage.path} className='underline text-orange-400'>
                    비밀번호 찾기
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={signUpPage.path} replace className=' underline text-orange-400'>
                    회원가입 하러 가기
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </div>
      </Container>
    </AuthBackground>
  );
}
