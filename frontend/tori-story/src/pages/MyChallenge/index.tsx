import Label from 'components/atoms/challenge/Label';
import RandomChallenge from 'components/organisms/challenge/RandomChallenge';
import { cls } from 'utils/cls';
import CustomChallengeList from 'components/organisms/challenge/CustomChallengeList';
import SignIn from './../Auth/SignIn/index';
import { AddButton } from 'components/atoms/iconButtons/AddButton';
import { useNavigate } from 'react-router-dom';
import { createChallengePage } from 'constants/pathname';
import CommonChallenge from 'components/organisms/challenge/CommonChallenge';

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
          <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center ' />
          <div className={cls('max-h-full overflow-y-auto pb-16')}>
            <Label title='공동 도전' />
            <CommonChallenge />
            <br />
            <Label title='랜덤 도전' />
            <RandomChallenge />
            <br />
            <Label title='자유 도전' />
            <CustomChallengeList />
            <div className={cls('fixed w-full inset-x-0 bottom-16 z-20')}>
              <div className={cls('flex justify-center my-1')}>
                <AddButton title='도전 작성' onClick={() => handleCreateChallengeButton()} />
              </div>
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
