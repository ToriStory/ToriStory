import { cls } from 'utils/cls';
import ChoiceModal from './ChoiceModal';
import { getLetter } from 'apis/toriApi';
import EmptyBasket from 'assets/images/EmptyBasket.png';
import useSWR from 'swr'; 

interface ReadLetterModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setBasketState: React.Dispatch<React.SetStateAction<number>>;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

export const ReadLetterModal = ({
  openModal,
  setOpenModal,
  setBasketState,
  setImgUrl,
}: ReadLetterModalProps) => {
  const handleCancelButton = () => {
    setOpenModal(false);
    setBasketState(0);
    setImgUrl(EmptyBasket);
  };

  const getLetterContent = useSWR('letterContent', () => getLetter());
  console.log(getLetterContent);

  return (
    <>
      {openModal && (
        //   TODO: 편지는 버튼 한개 수정하기
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'완료하기'}
          okayButtonAction={() => handleCancelButton()}
          setIsModalOpen={setOpenModal}
        >
          <div className={cls('p-6 text-center z-50')}>편지편지</div>
        </ChoiceModal>
      )}
    </>
  );
};
