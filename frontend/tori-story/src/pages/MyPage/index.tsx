import Label from 'components/atoms/challenge/Label';
import { MyCalendar } from 'components/molecules/calendar/MyCalendar';
import UserInfo from 'components/organisms/userInfo/UserInfo';
import SignIn from 'pages/Auth/SignIn';

const MyPage = () => {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <>
      <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center before:opacity-80' />
      <div className='w-full h-full'>
        {accessToken ? (
          <div className='w-full h-full'>
            <UserInfo />
            <div className='w-full'>
              <Label title='나의 기록들' />
            </div>
            <div className='w-full pb-20'>
              <MyCalendar />
            </div>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </>
  );
};

export default MyPage;
