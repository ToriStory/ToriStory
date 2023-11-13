import Fox from 'assets/images/Fox.png';
import EmptyBasket from 'assets/images/EmptyBasket.png';
import NotEmptyBasket from 'assets/images/NotEmptyBasket.png';
import { cls } from 'utils/cls';
import { useEffect, useState } from 'react';
import { getBasket } from 'apis/toriApi';
import { LoginModal } from 'components/molecules/modals/LoginModal';
import { FeedModal } from 'components/molecules/modals/FeedModal';
import { ReadLetterModal } from 'components/molecules/modals/ReadLetterModal';

export const ToriFox = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [imgUrl, setImgUrl] = useState<string>(EmptyBasket);
  const [basketState, setBasketState] = useState<number>(-1);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleGetBasketValue = async () => {
    const result = await getBasket();
    if (result.status === 200) {
      // 0: 빈 바구니
      // 1: 산딸기 바구니
      // 2: 여우
      if (result.data.data === 0) {
        setImgUrl(EmptyBasket);
        setBasketState(0);
      } else if (result.data.data === 1) {
        setImgUrl(NotEmptyBasket);
        setBasketState(1);
      } else if (result.data.data === 2) {
        setImgUrl(Fox);
        setBasketState(2);
      }
    }
  };

  const handleClickBasket = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (accessToken) {
      handleGetBasketValue();
    }
  }, []);

  return (
    <>
      <div className={cls('mr-[20%]')} onClick={() => handleClickBasket()}>
        <img src={imgUrl} alt='여우' className={cls(`${imgUrl === Fox ? 'w-32' : 'w-28 pb-3'}`)} />
      </div>
      {openModal &&
        ((basketState === -1 && <LoginModal openModal={openModal} setOpenModal={setOpenModal} />) ||
          (basketState === 0 && (
            <FeedModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              setBasketState={setBasketState}
              setImgUrl={setImgUrl}
            />
          )) ||
          (basketState === 2 && (
            <ReadLetterModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              setBasketState={setBasketState}
              setImgUrl={setImgUrl}
            />
          )))}
    </>
  );
};
