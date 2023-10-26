/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signInPage } from 'constants/pathname';
import { Link, useNavigate } from 'react-router-dom';
import AuthBackground from 'components/atoms/background/AuthBackground';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'components/atoms/input/FormInputText';
import { signUpAPI } from 'apis/auth';

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
interface SignUpInput {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function SignUp() {
  const navigate = useNavigate();
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: SignUpInput) => {
    const res = await signUpAPI({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
    if (res.status === 201) {
      navigate(signInPage.path, { replace: true });
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
              회원가입
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormInputText
                    name='nickname'
                    control={control}
                    label='닉네임'
                    margin='normal'
                    fullWidth
                    type='email'
                    id='nickname'
                    autoComplete='nickname'
                    rules={{
                      required: { value: true, message: '닉네임을 입력해주세요!' },
                      maxLength: { value: 8, message: '8자 이내로 작성해주세요!' },
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
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
                  />
                </Grid>
                <Grid item xs={12}>
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
                        value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/,
                        message: '영어와 숫자를 모두 사용하여 8~20자로 작성해주세요!',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInputText
                    name='confirmPassword'
                    control={control}
                    label='비밀번호 확인'
                    margin='normal'
                    fullWidth
                    type='password'
                    id='confirmPassword'
                    rules={{
                      required: { value: true, message: '비밀번호 확인을 입력해주세요!' },
                      validate: (value: string) =>
                        value === watch('password') || '비밀번호가 일치하지 않아요!',
                    }}
                  />
                </Grid>
                {/* <Grid item xs={12}>
              <FormControlLabel
              control={<Checkbox value='allowExtraEmails' color='primary' />}
              label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid> */}
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, fontWeight: 'bold', color: 'white', fontSize: 20 }}
              >
                회원가입
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link to={signInPage.path} replace className=' underline text-orange-400 '>
                    로그인 하러 가기
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </div>
      </Container>
    </AuthBackground>
  );
}
