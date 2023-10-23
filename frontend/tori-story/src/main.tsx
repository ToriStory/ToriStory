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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/challenge/my',
        element: <MyChallenge />,
      },
      {
        path: '/test',
        element: <Test />,
      },
      {
        path: '/start',
        element: <Test />,
      },
      {
        path: '/start/landing',
        element: <Test />,
      },
      {
        path: '/member/signin',
        element: <Test />,
      },
      {
        path: '/member/signup',
        element: <Test />,
      },
      {
        path: '/totori',
        element: <Totori />,
      },
      {
        path: '/challenge/together',
        element: <TogetherChallenge />,
      },
      {
        path: '/challenge/together/create',
        element: <TogetherChallengeCreate />,
      },
      {
        path: '/challenge/my/certification/gps',
        element: <Test />,
      },
      {
        path: '/challenge/my/certification/picture',
        element: <Test />,
      },
      {
        path: '/mytori',
        element: <MyTori />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/notification',
        element: <Notification />,
      },
      {
        path: '/setting',
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
