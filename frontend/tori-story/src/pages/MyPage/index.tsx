import Label from 'components/atoms/challenge/Label';
// import CustumChallengeList from 'components/organisms/challenge/CustomChallengeList';
import UserInfo from 'components/organisms/userInfo/UserInfo';
import SignIn from 'pages/Auth/SignIn';

const MyPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <div className=' h-[calc(100%-1.5rem)] overflow-y-hidden'>
      {accessToken ? (
        <div className=' h-[calc(100%-12rem)]'>
          <UserInfo />
          <div>
            <Label title='참여했던 도전들' />
          </div>
          <div className=' h-full overflow-y-auto'>
            {/* <CustumChallengeList isMyChallenge /> */}
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default MyPage;
