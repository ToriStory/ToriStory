import { cls } from 'utils/cls';
import { getLetter } from 'apis/toriApi';
import EmptyBasket from 'assets/images/EmptyBasket.png';
import useSWR from 'swr';
import Modal from 'components/atoms/modals/Modal';
import letterFront from 'assets/images/letterFront.png';
import letterBack from 'assets/images/letterBack.png';
import { useEffect, useState } from 'react';

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
    console.log('닫기~');

    // setOpenModal(false);
    setBasketState(0);
    setImgUrl(EmptyBasket);
  };

  const { data } = useSWR('/api/tori/basket/letter', () => getLetter());

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAnimation(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {openModal && (
        <Modal setIsModalOpen={setOpenModal} hasModalImg={true}>
          <div
            className={cls(
              'fixed mx-6 inset-0 flex items-center top-16 bg-orange-500 justify-center animate__animated animate__fadeInDown'
            )}
          >
            <img src={letterFront} alt={letterFront} className={cls('absolute z-20 ')} />
            <div className={cls('absolute z-10 w-full -bottom-2 flex items-center justify-center')}>
              <div className={cls('w-full mx-4 flex items-center justify-center')}>
                <div
                  className={cls(
                    `bg-white w-full rounded-lg p-6 max-w-sm text-gray-800   ${
                      showAnimation
                        ? 'translate-y-0 transition-[64px] duration-1000'
                        : 'translate-y-28'
                    }`
                  )}
                >
                  <div className={cls('font-unbeePuding text-2xl')}>{data?.data.letter}</div>
                  <div>
                    {data && data?.data.giftCnt !== 0 && (
                      <div className={cls('font-unbeePuding text-xl')}>
                        {data?.data.gift === 'DOTORI' ? '도토리' : '티켓'} {data?.data.giftCnt}개는
                        내 소소한 선물이야!
                      </div>
                    )}
                  </div>
                  <div className={cls('text-right mt-4 mb-4 font-unbeePuding text-2xl')}>
                    -여우가-
                  </div>
                  <div className={cls('text-center')}>
                    <div
                      className={cls(
                        'z-[10000] mx-auto w-fit bg-orange-400 text-gray-100 font-omyu px-4 py-2 rounded mb-[7rem]'
                      )}
                      onClick={() => handleCancelButton()}
                    >
                      닫기
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img src={letterBack} alt={letterBack} className={cls('absolute -z-10 -bottom-7')} />
          </div>
        </Modal>
      )}
    </>
  );
};
