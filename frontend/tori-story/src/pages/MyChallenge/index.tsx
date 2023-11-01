import Label from 'components/atoms/challenge/Label';
import RandomChallenge from 'components/organisms/challenge/RandomChallenge';
import { cls } from 'utils/cls';
import CustomChallengeList from 'components/organisms/challenge/CustomChallengeList';
import SignIn from './../Auth/SignIn/index';
import { AddButton } from 'components/atoms/iconButtons/AddButton';
import { useNavigate } from 'react-router-dom';
import { createChallengePage } from 'constants/pathname';

const MyChallenge = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleCreateChallengeButton = () => {
    navigate(createChallengePage.path, {
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
            <Label title='랜덤 도전' />
            <RandomChallenge />
            <br />
            <Label title='나의 도전' />
            <CustomChallengeList />
            <div className={cls('fixed bottom-16 right-4')}>
              <AddButton onClick={() => handleCreateChallengeButton()} size={36} />
            </div>
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
};

export default MyChallenge;
