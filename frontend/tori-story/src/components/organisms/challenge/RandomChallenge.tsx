import { CATEGORY } from 'constants/certificationCategory';
import { BadgeCheck, Camera, MapPin, RotateCw } from 'lucide-react';
import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
import { gray500, orange300, orange600 } from 'constants/color';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { useNavigate } from 'react-router-dom';
import { gpsCertificationPage, imageCertificationPage } from 'constants/pathname';
import { useEffect, useState } from 'react';
import { patchRandomChallengeApi, readRandomChallengeApi } from 'apis/challengeApi';
import { toast } from 'react-toastify';
import BottomLeft from 'components/molecules/challenge/BottomLeft';

interface RandomChallengeResponse {
  id: number;
  content: string;
  compFlag: boolean;
  category: string;
  keyword?: string;
}

const RandomChallenge = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [response, setResponse] = useState<RandomChallengeResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    getRandomChallenge();
  }, []);

  const getRandomChallenge = async () => {
    const result = await readRandomChallengeApi();
    if (result.status === 200) {
      setResponse(result.data.data);
    }
  };

  const certificationIcon =
    response && response.category === CATEGORY.photo ? (
      <Camera size={20} color={orange600} />
    ) : (
      <MapPin size={20} color={orange600} />
    );

  const handleCertification = () => {
    if (!response) return;

    if (response.category === CATEGORY.photo) {
      navigate(imageCertificationPage.path, { state: { id: response.id } });
    } else {
      navigate(gpsCertificationPage.path, { state: { keyword: response.keyword } });
    }
  };

  // 모달 - 닫히는 부분
  const handleCancelButton = () => {
    setOpenModal(false);
  };

  const openRenewModal = () => {
    setOpenModal(true);
  };

  const handleRenewButton = async () => {
    setOpenModal(false);
    const result = await patchRandomChallengeApi();
    if (result.status === 200) {
      setResponse(result.data.data);
    } else {
      toast.error('랜덤 도전 갱신에 실패했습니다');
    }
  };

  const button = <RotateCw size={20} color={gray500} onClick={openRenewModal} />;

  return (
    <>
      <Challenge
        headerLeft={<HeaderLeft challengeCategory='랜덤' />}
        headerRight={
          response && response.compFlag === true ? <></> : <HeaderRight button={button} />
        }
        bottomLeft={<BottomLeft icon={certificationIcon} />}
        bottomRight={
          response && response.compFlag === true ? (
            <BadgeCheck size={24} color={orange300} />
          ) : (
            <BottomButton title='인증' onClick={handleCertification} />
          )
        }
        content={response ? response.content : 'Loading...'}
      />
      {openModal && (
        <Dialog fullWidth open={openModal} onClose={handleCancelButton}>
          <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
            갱신하시겠습니까?
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <>
              <Button variant='contained' onClick={handleCancelButton} color='primary'>
                취소
              </Button>
              <Button variant='contained' onClick={handleRenewButton} color='primary'>
                갱신
              </Button>
            </>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default RandomChallenge;
