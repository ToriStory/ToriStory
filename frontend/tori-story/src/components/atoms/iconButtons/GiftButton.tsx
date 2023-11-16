import ImgDialog from 'components/molecules/modals/ImgDialog';
import { Gift } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import TotoriBoxHeader from 'assets/images/TotoriBoxHeader.png';
import TotoriBoxBody from 'assets/images/TotoriBoxBody.png';
import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { dailyCntAtom, totoriCntAtom } from 'stores/dotoriStore';
import GiftResultModal from '../modals/GiftResultModal';
import { LoginModal } from 'components/molecules/modals/LoginModal';
import OnceDialog from 'components/molecules/modals/OnceDialog';
import ChoiceDialog from 'components/molecules/modals/ChoiceDialog';
import EventExistIcon from './EventExistIcon';

export const GiftButton = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [dailyCnt, setDailyCnt] = useAtom(dailyCntAtom);
  const [totoriCnt, setTotoriCnt] = useAtom(totoriCntAtom);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [animateBox, setAnimateBox] = useState<boolean>(false);
  const [openGiftModal, setOpenGiftModal] = useState<boolean>(false);
  const [openNoTicketModal, setOpenNoTicketModal] = useState<boolean>(false);
  const [openUseTicketModal, setOpenUseTicketModal] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openGiftResultModal, setOpenGiftResultModal] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      dailyCnt > 0 ? setIsFree(true) : setIsFree(false);
    }
  }, []);

  useEffect(() => {
    dailyCnt > 0 ? setIsFree(true) : setIsFree(false);
  }, [dailyCnt]);

  useEffect(() => {
    if (openGiftModal === false) {
      setAnimateBox(false);
    }
  }, [openGiftModal]);

  const handlePickButton = (isFromContinue: boolean): boolean => {
    if (!accessToken) {
      setOpenLoginModal(true);
      return false;
    }

    if (!isFree && totoriCnt <= 0) {
      setOpenNoTicketModal(true);
      setOpenGiftResultModal(false);
      return false;
    }

    if (isFree) {
      if (isFromContinue) {
        setDailyCnt(dailyCnt - 1);
      } else {
        handleGiftResultModal();
        setDailyCnt(dailyCnt - 1);
      }
    } else {
      if (isFromContinue) {
        setTotoriCnt(totoriCnt - 1);
      } else {
        setOpenUseTicketModal(true);
      }
    }
    return true;
  };

  const handleGiftResultModal = () => {
    setAnimateBox(true);
    setTimeout(function () {
      setAnimateBox(false);
      setOpenGiftResultModal(true);
    }, 1000);
  };

  return (
    <>
      <div onClick={() => setOpenGiftModal(true)}>
        <EventExistIcon displayFlag={isFree} />
        <button className={cls('rounded-lg p-1 text-white bg-orange-300 w-fit')}>
          <Gift size={30} />
        </button>
      </div>
      <ImgDialog title='토토리' openModal={openGiftModal} setIsModalOpen={setOpenGiftModal}>
        <div className={cls('relative flex flex-col justify-center items-center my-6')}>
          <img
            className={cls(
              `absolute w-[55%] z-20 ${
                animateBox ? ' animate__animated animate__wobble animate__infinite' : ''
              }`
            )}
            src={TotoriBoxHeader}
          ></img>
          <img className={cls('w-1/2 z-10')} src={TotoriBoxBody}></img>
        </div>
        <Button
          variant='contained'
          sx={{ width: 'fit-content', margin: 'auto' }}
          onClick={() => handlePickButton(false)}
        >
          {isFree ? '무료 뽑기' : '뽑기'}
        </Button>
      </ImgDialog>
      <GiftResultModal
        openModal={openGiftResultModal}
        setIsModalOpen={setOpenGiftResultModal}
        handlePickButton={handlePickButton}
      />
      <OnceDialog
        openModal={openNoTicketModal}
        setIsModalOpen={setOpenNoTicketModal}
        content='토토리 티켓이 부족합니다.'
        buttonTitle='확인'
      />
      <ChoiceDialog
        openModal={openUseTicketModal}
        setIsModalOpen={setOpenUseTicketModal}
        content='토토리 티켓을 사용하여 뽑으시겠습니까?'
        rigthButtonTitle='뽑기'
        rightButtonOnClick={() => {
          handleGiftResultModal();
          setTotoriCnt(totoriCnt - 1);
        }}
      />
      <LoginModal openModal={openLoginModal} setOpenModal={setOpenLoginModal} />
    </>
  );
};
