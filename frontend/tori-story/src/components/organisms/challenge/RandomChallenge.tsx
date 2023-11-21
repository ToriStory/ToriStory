import { CATEGORY } from 'constants/certificationCategory';
import { BadgeCheck, Camera, MapPin, RotateCw } from 'lucide-react';
import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
import { gray500, orange300, orange600 } from 'constants/color';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { useNavigate } from 'react-router-dom';
import { gpsCertificationPage, imageCertificationPage } from 'constants/pathname';
import { useEffect, useState } from 'react';
import { patchRandomChallengeApi, readRandomChallengeApi } from 'apis/challengeApi';
import { toast } from 'react-toastify';
import BottomLeft from 'components/molecules/challenge/BottomLeft';
import ChoiceDialog from 'components/molecules/modals/ChoiceDialog';
import OnceDialog from 'components/molecules/modals/OnceDialog';
import { DialogContentText } from '@mui/material';
import { getToriAsset } from 'apis/toriApi';

interface RandomChallengeResponse {
  id: number;
  content: string;
  compFlag: boolean;
  category: string;
  keyword?: string;
}

const RandomChallenge = () => {
  const cntNeededRenew: number = 1;
  const [randomCnt, setRandomCnt] = useState<number | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [response, setResponse] = useState<RandomChallengeResponse>();
  const navigate = useNavigate();

  const certificationIcon =
    response && response.category === CATEGORY.photo ? (
      <Camera size={20} color={orange600} />
    ) : (
      <MapPin size={20} color={orange600} />
    );

  useEffect(() => {
    getRandomChallenge();
    handleGetAsset();
  }, []);

  const getRandomChallenge = async () => {
    const result = await readRandomChallengeApi();
    if (result.status === 200) {
      setResponse(result.data.data);
    }
  };

  const handleCertification = () => {
    if (!response) return;
    if (response.category === CATEGORY.photo) {
      navigate(imageCertificationPage.path, { state: { id: response.id } });
    } else {
      navigate(gpsCertificationPage.path, { state: { keyword: response.keyword } });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleRenewButton = async () => {
    setOpenModal(false);
    const result = await patchRandomChallengeApi();
    if (result.status === 200 && randomCnt) {
      setResponse(result.data.data);
      setRandomCnt(randomCnt - cntNeededRenew);
    } else {
      toast.error('랜덤 도전 갱신에 실패했습니다');
    }
  };

  const handleGetAsset = async () => {
    const res = await getToriAsset();
    if (res.code === 200) {
      setRandomCnt(res.data[2].assetCnt);
    }
  };

  return (
    <>
      <Challenge
        headerLeft={<HeaderLeft challengeCategory='랜덤' />}
        headerRight={
          response && response.compFlag === true ? (
            <></>
          ) : (
            <HeaderRight
              button={<RotateCw size={20} color={gray500} onClick={handleOpenModal} />}
            />
          )
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
      {openModal && randomCnt && randomCnt >= cntNeededRenew ? (
        <ChoiceDialog
          openModal={openModal}
          setIsModalOpen={setOpenModal}
          content={
            <>
              <DialogContentText>랜덤 티켓을 사용하여 갱신하시겠습니까?</DialogContentText>
              <DialogContentText>보유 중인 랜덤 티켓 수 : {randomCnt}개</DialogContentText>
            </>
          }
          leftButtonTitle='취소'
          leftButtonOnClick={handleCloseModal}
          rigthButtonTitle='갱신'
          rightButtonOnClick={handleRenewButton}
        />
      ) : (
        <OnceDialog
          openModal={openModal}
          setIsModalOpen={setOpenModal}
          content='랜덤 티켓이 부족합니다.'
          buttonTitle='확인'
        />
      )}
    </>
  );
};

export default RandomChallenge;
