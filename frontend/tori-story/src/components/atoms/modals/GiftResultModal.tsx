import ImgDialog from 'components/molecules/modals/ImgDialog';
import { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import Dotori from 'assets/images/Dotori.png';
import RandomTicket from 'assets/images/RandomTicket.svg';
import TotoriTicket from 'assets/images/TotoriTicket.svg';
import { Button } from '@mui/material';
import { getTotori } from 'apis/toriApi';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { dotoriCntAtom, randomCntAtom, totoriCntAtom } from 'stores/dotoriStore';

interface GiftResultModalProps {
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handlePickButton: (isFromContinue: boolean) => boolean;
}

interface totoriMap {
  [totoriNm: string]: {
    getTitle: (cnt?: number, name?: string) => string;
    getSrc: (src: string | null) => string;
    setAtom?: (cnt: number) => void;
  };
}

const GiftResultModal = ({ openModal, setIsModalOpen, handlePickButton }: GiftResultModalProps) => {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>('');
  const [animateBox, setAnimateBox] = useState<boolean>(false);
  const [dotoriCnt, setDotoriCnt] = useAtom(dotoriCntAtom);
  const [randomCnt, setRandomCnt] = useAtom(randomCntAtom);
  const [totoriCnt, setTotoriCnt] = useAtom(totoriCntAtom);

  const assetList: totoriMap = {
    DOTORI: {
      getTitle: (cnt?: number) => `도토리 ${cnt}개`,
      getSrc: (src: string | null) => src ?? `${Dotori}`,
      setAtom: (cnt: number) => setDotoriCnt(dotoriCnt + cnt),
    },
    RANDOM_TICKET: {
      getTitle: (cnt?: number) => `랜덤 티켓 ${cnt}개`,
      getSrc: (src: string | null) => src ?? `${RandomTicket}`,
      setAtom: (cnt: number) => setRandomCnt(randomCnt + cnt),
    },
    TOTORI_TICKET: {
      getTitle: (cnt?: number) => `토토리 티켓 ${cnt}개`,
      getSrc: (src: string | null) => src ?? `${TotoriTicket}`,
      setAtom: (cnt: number) => setTotoriCnt(totoriCnt + cnt),
    },
    TORI: {
      getTitle: (_?: number, name?: string) => (name ? `${name}` : '이름 없음'),
      getSrc: (src: string | null) => src ?? ``,
    },
  };

  useEffect(() => {
    if (openModal) {
      sendPick();
    }
  }, [openModal]);

  const sendPick = async () => {
    const res = await getTotori();
    if (res.status === 200) {
      const totoriNm = res.data.data.totoriNm;
      const title = assetList[totoriNm].getTitle(
        res.data.data.totoriCnt,
        res.data.data.item?.toriNm
      );
      const src = assetList[totoriNm].getSrc(res.data.data.item?.imgUrl);
      assetList[totoriNm].setAtom?.(res.data.data.totoriCnt);
      setModalTitle(title);
      setImgSrc(src);
    } else {
      toast.error('토토리 뽑기에 실패했습니다.');
    }
  };

  const handleContinuePick = () => {
    const result: boolean = handlePickButton(true);
    if (result === false) {
      return;
    }
    setAnimateBox(true);
    setTimeout(function () {
      setAnimateBox(false);
      sendPick();
    }, 600);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImgDialog title={modalTitle} openModal={openModal} setIsModalOpen={closeModal}>
      <div className={cls('flex justify-center items-center my-6')}>
        <img
          className={cls(`w-20 ${animateBox ? 'animate__animated  animate__rotateOut' : ''}`)}
          src={imgSrc}
        ></img>
      </div>
      <Button
        variant='contained'
        sx={{ width: 'fit-content', margin: 'auto' }}
        onClick={handleContinuePick}
      >
        계속 뽑기
      </Button>
    </ImgDialog>
  );
};

export default GiftResultModal;
