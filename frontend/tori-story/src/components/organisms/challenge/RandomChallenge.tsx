import { CATEGORY } from 'constants/certificationCategory';
import { Camera, MapPin, RotateCw } from 'lucide-react';
import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
import SuccessChallenge from './SuccessChallenge';
import { orange300 } from 'constants/color';
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { useNavigate } from 'react-router-dom';
import { gpsCertificationPage, imageCertificationPage } from 'constants/pathname';
import { useState } from 'react';
import { patchRandomChallengeApi } from 'apis/challengeApi';
import { toast } from 'react-toastify';

interface RandomChallengeResponse {
  id: number;
  content: string;
  compFlag: boolean;
  category: string;
}

const RandomChallenge = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [response, setResponse] = useState<RandomChallengeResponse>({
    id: 1,
    content: '바나나 우유 1000개 맛있게 마시기',
    compFlag: false,
    category: 'PHOTO',
  });
  const navigate = useNavigate();

  // const response: RandomChallengeResponse = {
  //   id: 1,
  //   content: '바나나 우유 1000개 맛있게 마시기',
  //   compFlag: false,
  //   category: 'PHOTO',
  // };

  const certificationIcon =
    response.category === CATEGORY.photo ? (
      <Camera color={orange300} />
    ) : (
      <MapPin color={orange300} />
    );

  const handleCertification = () => {
    if (response.category === CATEGORY.photo) {
      navigate(imageCertificationPage.path, { state: { id: response.id, type: 'random' } });
    } else {
      navigate(gpsCertificationPage.path, { state: { id: response.id, type: 'random' } });
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
    const result = await toast.promise(patchRandomChallengeApi(), {
      pending: '랜덤 도전을 갱신 중입니다',
      success: '랜덤 도전 갱신에 성공했습니다!',
      error: '랜덤 도전 갱신에 실패했습니다',
    });
    if (result.status === 200) {
      setResponse(result.data);
    }
  };

  const button = (
    <IconButton onClick={openRenewModal}>
      <RotateCw />
    </IconButton>
  );

  return (
    <>
      {response.compFlag === true ? (
        <SuccessChallenge title='오늘의 랜덤 도전을 성공했어요!' />
      ) : (
        <Challenge
          headerLeft={
            <HeaderLeft challengeCategory='랜덤' certificationCategory={certificationIcon} />
          }
          headerRight={<HeaderRight button={button} />}
          bottomRight={<BottomButton title='인증' onClick={handleCertification} />}
          content={response?.content}
        />
      )}
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
