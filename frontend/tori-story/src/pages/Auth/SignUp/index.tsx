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
import { checkAuthCodeAPI, sendAuthCodeAPI, signUpAPI } from 'apis/user';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { updateToast } from 'utils/toast';
import { CheckCircle2 } from 'lucide-react';
import { useTimer } from 'hooks/useTimer';
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
  authCode: string;
  password: string;
  confirmPassword: string;
  emailAuthorized: boolean;
}
export default function SignUp() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      authCode: '',
      password: '',
      confirmPassword: '',
      emailAuthorized: false,
    },
  });
  const { seconds, start, reset } = useTimer();
  const [emailAuthorized, setEmailAuthorized] = useState(false);
  useEffect(() => {
    if (emailAuthorized) {
      start();
    }
  }, [emailAuthorized, start]);

  const getEmailAuthCode = async () => {
    const res = await sendAuthCodeAPI({ email: watch('email') });
    if (res.status !== 200) {
      toast.error(`인증코드를 보내는 데 실패했습니다. 이메일 주소를 다시 확인해주세요`);
    }
  };
  const checkEmailAuthCode = async () => {
    const data = { code: watch('authCode'), email: watch('email') };
    const res = await checkAuthCodeAPI(data);
    const checkEmailAuthCodeToastId = toast.loading('인증코드를 확인 중입니다');

    if (res.status === 200) {
      setValue('emailAuthorized', true);
      updateToast(checkEmailAuthCodeToastId, `이메일 인증에 성공했습니다!`, 'success');
    } else {
      setValue('emailAuthorized', false);
      updateToast(
        checkEmailAuthCodeToastId,
        `이메일 인증에 실패했습니다. 코드를 다시 확인해주세요`,
        'error'
      );
    }
  };
  const onClickGetAuthCode = () => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const email = watch('email');
    if (re.test(email)) {
      setEmailAuthorized(true);
      reset();
      // setEnterEmail(true);
      clearErrors('email');
      getEmailAuthCode();
    } else {
      setError('email', {
        message: '이메일 형식에 맞춰 작성해주세요!',
      });
    }
  };
  const onClickCheckAuthCode = () => {
    if (watch('emailAuthorized')) {
      return;
    }
    const re = /^[0-9]{6}$/i;
    const authCode = watch('authCode');
    if (re.test(authCode)) {
      clearErrors('authCode');
      checkEmailAuthCode();
    } else {
      setError('authCode', {
        message: '인증코드를 다시 확인해주세요!',
      });
    }
  };
  const onSubmit = async (data: SignUpInput) => {
    if (!data.emailAuthorized) {
      setError('email', {
        message: '이메일 인증이 필요합니다',
      });
      setError('authCode', {
        message: '이메일 인증이 필요합니다',
      });
      return;
    }
    const signUpToastId = toast.loading('회원가입 중입니다');
    const res = await signUpAPI({
      code: data.authCode,
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });

    if (res.status === 201) {
      updateToast(signUpToastId, '회원가입에 성공했습니다!', 'success');
      navigate(signInPage.path, { replace: true });
    } else {
      updateToast(signUpToastId, '회원가입에 실패했습니다', 'error');
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
                <Grid container justifyContent={'center'} alignItems={'center'}>
                  <Grid item xs={8}>
                    <FormInputText
                      name='email'
                      control={control}
                      label='이메일'
                      margin='normal'
                      fullWidth
                      type='email'
                      id='email'
                      autoComplete='email'
                      disabled={watch('emailAuthorized') ? true : false}
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
                  <Grid
                    item
                    xs={4}
                    sx={{
                      display: 'flex',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    mb={errors['email'] ? '20px' : emailAuthorized ? '-4PX' : '-4px'}
                  >
                    <Button
                      fullWidth
                      sx={{ justifyContent: 'center', alignItems: 'center' }}
                      style={{ whiteSpace: 'nowrap', height: 40 }}
                      variant='contained'
                      disabled={watch('emailAuthorized') ? true : false}
                      onClick={onClickGetAuthCode}
                    >
                      {emailAuthorized ? '다시 받기' : '인증번호 받기'}
                    </Button>
                  </Grid>
                </Grid>
                {emailAuthorized && (
                  <Grid container justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={8} style={{ position: 'relative' }}>
                      <FormInputText
                        name='authCode'
                        control={control}
                        label='인증번호'
                        margin='normal'
                        fullWidth
                        type='number'
                        id='authCode'
                        disabled={watch('emailAuthorized') ? true : false}
                        rules={{
                          required: { value: true, message: '인증번호를 입력해주세요!' },
                        }}
                      />
                      <div className=' absolute top-6 right-2'>
                        {watch('emailAuthorized') ? (
                          <CheckCircle2 className='text-orange-400' />
                        ) : (
                          `${Math.floor(seconds / 60)}`.padStart(2, '0') +
                          `:` +
                          `${seconds % 60}`.padStart(2, '0')
                        )}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      mb={errors['authCode'] ? '20px' : '-4px'}
                    >
                      <Button
                        fullWidth
                        style={{ whiteSpace: 'nowrap', height: 40 }}
                        variant='contained'
                        disabled={watch('emailAuthorized') ? true : false}
                        onClick={onClickCheckAuthCode}
                      >
                        인증번호 확인
                      </Button>
                    </Grid>
                  </Grid>
                )}
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
