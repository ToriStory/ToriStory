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
      <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center before:opacity-80' />
      <div className={cls(' h-full')}>
        <TogetherCustomChallengeList />
        <div className={cls('fixed w-full inset-x-0 bottom-16 z-20')}>
          <div className={cls('flex justify-center my-1')}>
            <AddButton title='도전 작성' onClick={() => handleCreateChallengeButton()} />
          </div>
        </div>
      </div>
      {openModal && <LoginModal openModal={openModal} setOpenModal={setOpenModal} />}
    </>
  );
};

export default TogetherChallenge;
