/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { myPagePage } from 'constants/pathname';
import { useNavigate } from 'react-router-dom';
import AuthBackground from 'components/atoms/background/AuthBackground';
import { useForm } from 'react-hook-form';
import { FormInputText } from 'components/atoms/input/FormInputText';
import { getUserInfoAPI, updateUserAPI } from 'apis/user';
import { toast } from 'react-toastify';
import { updateToast } from 'utils/toast';
import useSWR from 'swr';
import { useEffect } from 'react';
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
interface UpdateUserInput {
  nickname: string;
  password: string;
  confirmPassword: string;
}
export default function UpdateUser() {
  const { data } = useSWR('/api/member', getUserInfoAPI);

  const navigate = useNavigate();
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      nickname: data?.data.nickname ? data.data.nickname : '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (data) {
      setValue('nickname', data?.data.nickname);
    }
  }, [data, setValue]);
  const onSubmit = async (data: UpdateUserInput) => {
    const updateUserToastId = toast.loading('회원정보 수정 중입니다');
    const res = await updateUserAPI({
      nickname: data.nickname,
      password: data.password,
    });

    if (res.status === 200) {
      updateToast(updateUserToastId, '회원정보 수정에 성공했습니다!', 'success');
      navigate(myPagePage.path, { replace: true });
    } else {
      updateToast(updateUserToastId, '회원정보 수정에 실패했습니다', 'error');
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
              회원정보 수정
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container>
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
                수정하기
              </Button>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </div>
      </Container>
    </AuthBackground>
  );
}
