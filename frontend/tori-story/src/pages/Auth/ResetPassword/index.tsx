/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthBackground from 'components/atoms/background/AuthBackground';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'components/atoms/input/FormInputText';
// import { resetPasswordAPI } from 'apis/user';
// import { toast } from 'react-toastify';

// TODO remove, this demo shouldn't need to reset the theme.
interface ResetPasswordInput {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: ResetPasswordInput) => {
    console.log(data);
    return;
    // const res = await resetPasswordAPI({
    //   password: data.password,
    // });

    // if (res.status === 200) {
    //   toast.success('비밀번호 재설정이 완료되었습니다!');
    // } else {
    //   toast.error('비밀번호 재설정에 실패했습니다');
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
              비밀번호 재설정
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
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
                      value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,20}$/,
                      message: '영어와 숫자, 특수문자를 모두 사용하여 8~20자로 작성해주세요!',
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
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, fontWeight: 'bold', color: 'white', fontSize: 20 }}
              >
                비밀번호 재설정하기
              </Button>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </div>
      </Container>
    </AuthBackground>
  );
}
