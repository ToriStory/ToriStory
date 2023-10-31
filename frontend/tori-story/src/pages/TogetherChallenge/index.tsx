import { AddButton } from 'components/atoms/iconButtons/AddButton';
import { LoginModal } from 'components/molecules/modals/LoginModal';
import TogetherCustomChallengeList from 'components/organisms/challenge/TogetherCustomChallengeList';
import { createChallengePage } from 'constants/pathname';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cls } from 'utils/cls';

const TogetherChallenge = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCreateChallengeButton = () => {
    if (accessToken) {
      navigate(createChallengePage.path, {
        state: {
          content: '',
          id: -1,
        },
      });
    } else {
      setOpenModal(true);
    }
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
      {openModal && <LoginModal openModal={openModal} setOpenModal={setOpenModal} />}
    </>
  );
};

export default TogetherChallenge;
