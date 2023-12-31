import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './assets/fonts/Font.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import SignIn from 'pages/Auth/SignIn/index.tsx';
import SignUp from 'pages/Auth/SignUp/index.tsx';
import { orange400 } from 'constants/color.ts';
import {
  appPage,
  createChallengePage,
  gpsCertificationPage,
  imageCertificationPage,
  landingPage,
  myChallengePage,
  commonChallengeDetailPage,
  myPagePage,
  myToriPage,
  notificationPage,
  privatePolicyPage,
  settingPage,
  signInPage,
  signUpPage,
  splashPage,
  testPage,
  togetherChallengePage,
  totoriPage,
  updateUserInfoPage,
  findPasswordPage,
  resetPasswordPage,
  commonChallengeReviewPage,
  customChallengeMemoryPage,
  thankNotePage,
  createThankNotePage,
} from 'constants/pathname.ts';
import CertificationGPS from 'pages/CertificationGPS/index.tsx';
import CertificationAI from 'pages/CertificationAI/index.tsx';
import * as Sentry from '@sentry/react';
import PrivatePolicy from 'pages/Policy/Private/index.tsx';
import UpdateUser from 'pages/Auth/UpdateUser/index.tsx';
import CommonChallengeDetail from 'pages/CommonChallengeDetail/index.tsx';
import FindPassword from 'pages/Auth/FindPassword/index.tsx';
import ResetPassword from 'pages/Auth/ResetPassword/index.tsx';
import ThankNote from 'pages/ThankNote/index.tsx';
import { CreateThankNote } from 'pages/ThankNote/Create/index.tsx';
import CommonChallengeReview from 'pages/CommonChallengeReview/index.tsx';
import CustomChallengeMemory from 'pages/MyChallenge/CustomChallengeMemory/index.tsx';
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
        path: signInPage.path,
        element: <SignIn />,
      },
      {
        path: signUpPage.path,
        element: <SignUp />,
      },
      {
        path: findPasswordPage.path,
        element: <FindPassword />,
      },
      {
        path: resetPasswordPage.path,
        element: <ResetPassword />,
      },
      {
        path: myChallengePage.path,
        element: <MyChallenge />,
      },
      {
        path: commonChallengeDetailPage.path,
        element: <CommonChallengeDetail />,
      },
      {
        path: commonChallengeReviewPage.path,
        element: <CommonChallengeReview />,
      },
      {
        path: customChallengeMemoryPage.path,
        element: <CustomChallengeMemory />,
      },
      {
        path: thankNotePage.path,
        element: <ThankNote />,
      },
      {
        path: createThankNotePage.path,
        element: <CreateThankNote />,
      },
      {
        path: testPage.path,
        element: <Test />,
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
        element: <CertificationGPS />,
      },
      {
        path: imageCertificationPage.path,
        element: <CertificationAI />,
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
        path: updateUserInfoPage.path,
        element: <UpdateUser />,
      },
      {
        path: notificationPage.path,
        element: <Notification />,
      },
      {
        path: settingPage.path,
        element: <Setting />,
      },
      {
        path: privatePolicyPage.path,
        element: <PrivatePolicy />,
      },
    ],
  },
]);

const orangeTheme = createTheme({
  palette: {
    primary: {
      main: orange400,
      contrastText: 'white',
    },
  },
  typography: {
    fontFamily: '"omyu","jua", sans-serif',
  },
});
Sentry.init({
  dsn: 'https://2f3c9fd7cce52cec5c4af3789a132779@o4506148833722368.ingest.sentry.io/4506148840734720',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={orangeTheme}>
      <RouterProvider router={router} />
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
        transition={Slide}
        style={{ marginBottom: 16, fontFamily: 'jua' }}
      />
    </ThemeProvider>
  </React.StrictMode>
);
