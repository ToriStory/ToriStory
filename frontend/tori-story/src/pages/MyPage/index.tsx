import UserInfo from 'components/organisms/userInfo/UserInfo';
import SignIn from 'pages/Auth/SignIn';

const MyPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  return <>{accessToken ? <UserInfo /> : <SignIn />}</>;
};

export default MyPage;
