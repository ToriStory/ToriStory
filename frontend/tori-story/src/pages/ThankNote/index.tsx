import Label from 'components/atoms/challenge/Label';
import { cls } from 'utils/cls';
import SignIn from './../Auth/SignIn/index';
import { AddButton } from 'components/atoms/iconButtons/AddButton';
import { useNavigate } from 'react-router-dom';
import { createThankNotePage } from 'constants/pathname';
import ThankNoteList from 'components/organisms/thankNote/ThankNoteList';

const ThankNote = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleCreateThankNoteButton = () => {
    navigate(createThankNotePage.path, {
      state: {
        content: '',
        id: -1,
      },
    });
  };

  return (
    <>
      {accessToken ? (
        <>
          <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center before:opacity-60' />
          <div className={cls('max-h-full overflow-y-auto pb-12')}>
            <Label title='2022/11/07' />
            <div className='flex flex-col items-center justify-center'>
              <div>연속 13일째 작성 중!</div>
              <div>지금까지 총 40일 동안 감사일기를 작성했어요</div>
            </div>
            <Label title='오늘의 일기' />
            <ThankNoteList />
            <br />
            <div className={cls('fixed bottom-16 right-4')}>
              <AddButton onClick={() => handleCreateThankNoteButton()} size={36} />
            </div>
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default ThankNote;
