import {
  createChallengePage,
  gpsCertificationPage,
  imageCertificationPage,
  imageMemoryPage,
  landingPage,
  myChallengePage,
  commonChallengeDetailPage,
  myPagePage,
  myToriPage,
  notificationPage,
  settingPage,
  signInPage,
  signUpPage,
  splashPage,
  togetherChallengePage,
  totoriPage,
} from 'constants/pathname';
import { useNavigate } from 'react-router-dom';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  // Splash
  const navigateToSplash = () => {
    navigate(splashPage.path);
  };

  // Landing
  const navigateToLanding = () => {
    navigate(landingPage.path);
  };

  // Member
  const navigateToSignin = () => {
    navigate(signInPage.path);
  };

  const navigateToSignup = () => {
    navigate(signUpPage.path);
  };

  // 토토리
  const navigateToTotori = () => {
    navigate(totoriPage.path);
  };

  // 나도 도전
  const navigateToTogetherChallenge = () => {
    navigate(togetherChallengePage.path);
  };

  const navigateToTogetherChallengeCreate = () => {
    navigate(createChallengePage.path);
  };

  // 나의 도전
  const navigateToMyChallenge = () => {
    navigate(myChallengePage.path);
  };

  const navigateToCertificationGPS = () => {
    navigate(gpsCertificationPage.path);
  };

  const navigateToCertificationPhoto = () => {
    navigate(imageCertificationPage.path);
  };

  const navigateToMemory = () => {
    navigate(imageMemoryPage.path);
  };

  const navigateToCommonChallengeDetail = () => {
    navigate(commonChallengeDetailPage.path);
  };

  // MyTory
  const navigateToMyTori = () => {
    navigate(myToriPage.path);
  };

  // MyPage
  const navigateToMyPage = () => {
    navigate(myPagePage.path);
  };

  // Alarm
  const navigateToNotification = () => {
    navigate(notificationPage.path);
  };

  // Setting
  const navigateToSetting = () => {
    navigate(settingPage.path);
  };

  return {
    navigateToSplash,
    navigateToSignin,
    navigateToTotori,
    navigateToTogetherChallenge,
    navigateToTogetherChallengeCreate,
    navigateToLanding,
    navigateToMyChallenge,
    navigateToCommonChallengeDetail,
    navigateToCertificationGPS,
    navigateToCertificationPhoto,
    navigateToMemory,
    navigateToSignup,
    navigateToMyTori,
    navigateToMyPage,
    navigateToNotification,
    navigateToSetting,
  };
};

export default useAppNavigation;
