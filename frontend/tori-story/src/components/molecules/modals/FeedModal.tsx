import { cls } from 'utils/cls';
import ChoiceModal from './ChoiceModal';
import { feedFox } from 'apis/toriApi';
import NotEmptyBasket from 'assets/images/NotEmptyBasket.png';
import { dotoriCntAtom } from 'stores/dotoriStore';
import { useAtom, useSetAtom } from 'jotai';
import { isQuestExistenceAtom } from 'stores/questStore';
import { useState } from 'react';

interface FeedModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBasketState: React.Dispatch<React.SetStateAction<number>>;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const FeedModal = ({
  openModal,
  setOpenModal,
  setBasketState,
  setImgUrl,
}: FeedModalProps) => {
  const [dotoriCnt, setDotoriCnt] = useAtom(dotoriCntAtom);
  const setIsQuestExistence = useSetAtom(isQuestExistenceAtom);

  const [errorMessage, setErrorMessage] = useState('');

  const handleCancelButton = () => {
    setOpenModal(false);
  };

  const handleFeedRasberry = async () => {
    const result = await feedFox();
    if (result.status === 201) {
      setBasketState(1);

      setImgUrl(NotEmptyBasket);
      setDotoriCnt(dotoriCnt - 2);
      setIsQuestExistence(true);
      setOpenModal(false);
    } else {
      setErrorMessage('도토리 개수가 부족해요!');
    }
  };

  return (
    <>
      {openModal && (
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'먹이주기'}
          okayButtonAction={() => handleFeedRasberry()}
          setIsModalOpen={setOpenModal}
        >
          <div className={cls('p-6 text-center z-50')}>
            <div>여우에게 산딸기를 선물로 주시겠습니까?</div>
            <div className={cls('pt-1 text-xs text-orange-200')}>
              여우는 편지를 들고 오고 가끔 선물을 주기도합니다
            </div>
            <div className={cls('pt-1 text-sm text-red-300 h-2')}>{errorMessage}</div>
          </div>
        </ChoiceModal>
      )}
    </>
  );
};
