import { CATEGORY } from 'constants/certificationCategory';
import { Camera, MapPin } from 'lucide-react';
import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
import SuccessChallenge from './SuccessChallenge';
import useAppNavigation from 'hooks/useAppNavigation';
import { orange300 } from 'constants/color';
// import { IconButton } from '@mui/material';

interface RandomChallengeResponse {
  id: number;
  content: string;
  compFlag: boolean;
  category: string;
}

const RandomChallenge = () => {
  const navigate = useAppNavigation();
  const response: RandomChallengeResponse = {
    id: 1,
    content: '바나나 우유 1000개 맛있게 마시기',
    compFlag: false,
    category: 'PHOTO',
  };

  const certificationIcon =
    response.category === CATEGORY.photo ? (
      <Camera color={orange300} />
    ) : (
      <MapPin color={orange300} />
    );

  const handleCertification = () => {
    if (response.category === CATEGORY.photo) {
      navigate.navigateToCertificationPhoto();
    } else {
      navigate.navigateToCertificationGPS();
    }
  };

  return (
    <>
      {response.compFlag === true ? (
        <SuccessChallenge title='오늘의 랜덤 도전을 성공했어요!' />
      ) : (
        <Challenge
          headerLeft={
            <HeaderLeft challengeCategory='랜덤' certificationCategory={certificationIcon} />
          }
          // headerRight={
          //   <IconButton>
          //     <RotateCw />
          //   </IconButton>
          // }
          bottomRight={<BottomButton title='인증' onClick={handleCertification} />}
          content={response.content}
        />
      )}
    </>
  );
};

export default RandomChallenge;
