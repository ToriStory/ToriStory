import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyChallenge from 'pages/MyChallenge/index.tsx';
import Test from 'pages/Test.tsx';
import Totori from 'pages/Totori/index.tsx';
import TogetherChallenge from 'pages/TogetherChallenge/index.tsx';
import MyTori from 'pages/MyTori/index.tsx';
import MyPage from 'pages/MyPage/index.tsx';
import Notification from 'pages/Notification/index.tsx';
import Setting from 'pages/Setting/index.tsx';
import { TogetherChallengeCreate } from 'pages/TogetherChallengeCreate/index.tsx';
import Landing from 'pages/Landing/index.tsx';
import SignIn from 'pages/Auth/SignIn.tsx';
import SignUp from 'pages/Auth/SignUp.tsx';
import {
  appPage,
  createChallengePage,
  gpsCertificationPage,
  imageCertificationPage,
  landingPage,
  myChallengePage,
  myPagePage,
  myToriPage,
  notificationPage,
  settingPage,
  signInPage,
  signUpPage,
  splashPage,
  testPage,
  togetherChallengePage,
  totoriPage,
} from 'constants/pathname.ts';

const router = createBrowserRouter([
  {
    path: splashPage.path,
    element: <Test />,
  },
  {
    path: landingPage.path,
    element: <Landing />,
  },
  {
    path: appPage.path,
    element: <App />,
    children: [
      {
        path: myChallengePage.path,
        element: <MyChallenge />,
      },
      {
        path: testPage.path,
        element: <Test />,
      },

      {
        path: signInPage.path,
        element: <SignIn />,
      },
      {
        path: signUpPage.path,
        element: <SignUp />,
      },
      {
        path: totoriPage.path,
        element: <Totori />,
      },
      {
        path: togetherChallengePage.path,
        element: <TogetherChallenge />,
      },
      {
        path: createChallengePage.path,
        element: <TogetherChallengeCreate />,
      },
      {
        path: gpsCertificationPage.path,
        element: <Test />,
      },
      {
        path: imageCertificationPage.path,
        element: <Test />,
      },
      {
        path: myToriPage.path,
        element: <MyTori />,
      },
      {
        path: myPagePage.path,
        element: <MyPage />,
      },
      {
        path: notificationPage.path,
        element: <Notification />,
      },
      {
        path: settingPage.path,
        element: <Setting />,
      },
    ],
  },
]);

const orangeTheme = createTheme({
  palette: {
    primary: {
      main: '#FF762E',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={orangeTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
