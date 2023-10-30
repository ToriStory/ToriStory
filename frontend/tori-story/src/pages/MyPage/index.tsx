import AuthBackground from 'components/atoms/background/AuthBackground';
import Label from 'components/atoms/challenge/Label';
import CustumChallengeList from 'components/organisms/challenge/CustomChallengeList';
import UserInfo from 'components/organisms/userInfo/UserInfo';
import SignIn from 'pages/Auth/SignIn';

const MyPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <AuthBackground>
      <div className='w-full h-[calc(100%-7rem)] overflow-y-hidden'>
        {accessToken ? (
          <div className='w-full h-[calc(100%-12rem)]'>
            <UserInfo />
            <div className='w-full'>
              <Label title='참여했던 도전들' />
            </div>
            <div className='w-full h-full overflow-y-auto'>
              <CustumChallengeList isMyChallenge />
            </div>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </AuthBackground>
  );
};

export default MyPage;
