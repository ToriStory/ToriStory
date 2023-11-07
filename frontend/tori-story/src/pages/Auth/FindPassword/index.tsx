/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signInPage, signUpPage } from 'constants/pathname';
import { Link } from 'react-router-dom';
import AuthBackground from 'components/atoms/background/AuthBackground';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'components/atoms/input/FormInputText';
import {
  EmailProps,
  // findPasswordAPI
} from 'apis/user';
// import { toast } from 'react-toastify';

export default function FindPassword() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: EmailProps) => {
    console.log(data.email);
    return;
    // const res = await findPasswordAPI({
    //   email: data.email,
    // });
    // if (res.status === 200) {
    //   toast.success('이메일로 비밀번호 재설정 링크를 보냈습니다!');
    // } else {
    //   toast.error('이메일이 유효하지 않습니다');
    // }
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
              비밀번호 찾기
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
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, fontWeight: 'bold', color: 'white', fontSize: 20 }}
              >
                비밀번호 재설정 링크 받기
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={signInPage.path} replace className=' underline text-orange-400'>
                    로그인 하러 가기
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
