import { CATEGORY } from 'constants/certificationCategory';
import { Camera, MapPin, RotateCw } from 'lucide-react';
import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
import SuccessChallenge from './SuccessChallenge';
import { orange300 } from 'constants/color';
import { IconButton } from '@mui/material';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { useNavigate } from 'react-router-dom';
import { gpsCertificationPage, imageCertificationPage } from 'constants/pathname';

interface RandomChallengeResponse {
  id: number;
  content: string;
  compFlag: boolean;
  category: string;
}

const RandomChallenge = () => {
  const navigate = useNavigate();

  const response: RandomChallengeResponse = {
    id: 1,
    content: '바나나 우유 1000개 맛있게 마시기',
    compFlag: false,
    category: 'GPS',
  };

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

  const handleRenew = () => {
    alert('갱신하시겠습니까?');
  };

  const button = (
    <IconButton onClick={handleRenew}>
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
          content={response.content}
        />
      )}
    </>
  );
};

export default RandomChallenge;
