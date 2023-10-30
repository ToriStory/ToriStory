import { AddButton } from 'components/atoms/iconButtons/AddButton';
import TogetherCustomChallengeList from 'components/organisms/challenge/TogetherCustomChallengeList';
import { createChallengePage } from 'constants/pathname';
import { useNavigate } from 'react-router-dom';
import { cls } from 'utils/cls';

const TogetherChallenge = () => {
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
      <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center' />
      <div className={cls(' h-full ')}>
        <TogetherCustomChallengeList />
        <div className={cls('fixed bottom-16 right-4')}>
          <AddButton onClick={() => handleCreateChallengeButton()} size={36} />
        </div>
      </div>
    </>
  );
};

export default TogetherChallenge;
