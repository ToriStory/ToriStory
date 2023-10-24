/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signUpPage } from 'constants/pathname';
import { Link } from 'react-router-dom';
import AuthBackground from 'components/atoms/background/AuthBackground';

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
export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                type='email'
                id='email'
                label='이메일'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='비밀번호'
                type='password'
                id='password'
                autoComplete='current-password'
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
                  <Link to='#' className='underline text-orange-400'>
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
