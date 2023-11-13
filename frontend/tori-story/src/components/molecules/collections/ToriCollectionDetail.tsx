import Label from 'components/atoms/challenge/Label';
import { ToriCollectionItemProps } from 'types/tori';
import { cls } from 'utils/cls';
import Dotori from 'assets/images/Dotori.png';
import { Button } from '@mui/material';
import { X } from 'lucide-react';
import { LoginModal } from '../modals/LoginModal';
import { useState } from 'react';
import { adoptSquirrel } from 'apis/toriApi';
import { updateToriProfile } from 'apis/user';
import { useAtom, useSetAtom } from 'jotai';
import { dotoriCntAtom, profileToriImgUrlAtom } from 'stores/dotoriStore';

export const ToriCollectionDetail = ({
  toriCollection,
  handleClose,
}: {
  toriCollection: ToriCollectionItemProps;
  handleClose: () => void;
}) => {
  const accessToken = localStorage.getItem('accessToken');
  const [dotoriCnt, setDotoriCnt] = useAtom(dotoriCntAtom);
  const setToriUrlImg = useSetAtom(profileToriImgUrlAtom);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdoptButton = async (toriCollectionId: number, toriCollectionPrice: number) => {
    if (accessToken) {
      const result = await adoptSquirrel(toriCollectionId);
      if (result.status === 201) {
        setErrorMsg('다람쥐를 마이토리로 데려오는 데 성공했습니다!');
        toriCollection.collectionFlag = true;
        setDotoriCnt(dotoriCnt - toriCollectionPrice);
        //TODO: 펑 터지는 애니메이션 효과 넣기!
      } else if (result.status === 400) {
        setErrorMsg(result.data.data);
      } else {
        setErrorMsg('다람쥐를 마이토리로 데려오는 데 실패했습니다');
      }
    } else {
      setOpenModal(true);
    }
  };

  const handleChangeTori = async (toriCollectionImgUrl: string, toriCollectionId: number) => {
    if (accessToken) {
      const result = updateToriProfile(toriCollectionImgUrl, toriCollectionId);
      setToriUrlImg(toriCollectionImgUrl);
      console.log(result);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <div className={cls('bg-orange-50 rounded-lg')}>
        <div className={cls('absolute top-8 right-8 text-orange-800 font-black z-40')}>
          <X fontSize={30} strokeWidth={6} onClick={handleClose} />
        </div>
        <Label title={toriCollection.toriName} />

        <div className='relative w-1f' style={{ paddingTop: '100%' }}>
          <div className='absolute inset-0 flex items-center justify-center'>
            <img
              src={toriCollection.imgUrl}
              alt={toriCollection.toriName}
              className='w-1/2 max-h-full object-contain'
            />
          </div>
        </div>
        <div className={cls('flex items-center justify-center font-semibold text-orange-700')}>
          {!toriCollection.collectionFlag && (
            <>
              <img src={Dotori} alt='dotori' className={cls('w-8 mr-2')} />
              {toriCollection.price}
            </>
          )}
        </div>
        <div className={cls('flex items-center justify-center text-orange-400')}>{errorMsg}</div>
        <div className={cls('flex items-center justify-center')}>
          {toriCollection.collectionFlag ? (
            <Button
              variant='contained'
              sx={{ marginTop: '16px', marginBottom: '16px' }}
              onClick={() => handleChangeTori(toriCollection.imgUrl, toriCollection.id)}
            >
              프로필 변경하기
            </Button>
          ) : (
            <Button
              variant='contained'
              sx={{ marginTop: '16px', marginBottom: '16px' }}
              onClick={() => handleAdoptButton(toriCollection.id, toriCollection.price)}
            >
              데려오기
            </Button>
          )}
        </div>
      </div>

      {openModal && (
        <div className={cls('relative w-full h-full')}>
          <div className={cls('absolute inset-0')}>
            <LoginModal openModal={openModal} setOpenModal={setOpenModal} isOverlap={true} />
          </div>
        </div>
      )}
    </>
  );
};
