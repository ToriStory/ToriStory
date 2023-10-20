import { useNavigate } from 'react-router-dom';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  // Splash
  const navigateToSplash = () => {
    navigate('/start');
  };

  // Landing
  const navigateToLanding = () => {
    navigate('/start/landing');
  };

  // Member
  const navigateToSignin = () => {
    navigate('/member/signin');
  };

  const navigateToSignup = () => {
    navigate('/member/signup');
  };

  // 토토리
  const navigateToTotori = () => {
    navigate('/totori');
  };

  // 나도 도전
  const navigateToTogetherChallenge = () => {
    navigate('/challenge/together');
  };

  const navigateToTogetherChallengeCreate = () => {
    navigate('/challenge/together/create');
  };

  // 나의 도전
  const navigateToMyChallenge = () => {
    navigate('/challenge/my');
  };

  const navigateToCertificationGPS = () => {
    navigate('/challenge/my/certification/gps');
  };

  const navigateToCertificationPicture = () => {
    navigate('/challenge/my/certification/picture');
  };

  // MyTory
  const navigateToMyTori = () => {
    navigate('/mytori');
  };

  // MyPage
  const navigateToMyPage = () => {
    navigate('/mypage');
  };

  // Alarm
  const navigateToNotification = () => {
    navigate('/notification');
  };

  // Setting
  const navigateToSetting = () => {
    navigate('/setting');
  };

  return {
    navigateToSplash,
    navigateToSignin,
    navigateToTotori,
    navigateToTogetherChallenge,
    navigateToTogetherChallengeCreate,
    navigateToLanding,
    navigateToMyChallenge,
    navigateToCertificationGPS,
    navigateToCertificationPicture,
    navigateToSignup,
    navigateToMyTori,
    navigateToMyPage,
    navigateToNotification,
    navigateToSetting,
  };
};

export default useAppNavigation;
