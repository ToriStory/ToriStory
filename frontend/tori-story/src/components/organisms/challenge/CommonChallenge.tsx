import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import Challenge from './Challenge';
import BottomButton from 'components/atoms/challenge/BottomButton';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { IconButton } from '@mui/material';
import { ArrowRight, BadgeCheck, User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { commonChallengeDetailPage } from 'constants/pathname';
import BottomLeft from 'components/molecules/challenge/BottomLeft';
import { useEffect, useState } from 'react';
import { orange300 } from 'constants/color';

interface CommonChallengeResoponse {
  commonChallengeId: number;
  content: string;
  attendFlag: boolean;
  compFlag: boolean;
  compCnt: number;
  maxCnt: number;
  unit: number[];
}

const CommonChallenge = () => {
  const navigate = useNavigate();
  const [attendCnt, setAttendCnt] = useState<number>();
  const [attendFlag, setAttendFlag] = useState<boolean>();
  const [compFlag, setCompFlag] = useState<boolean>();

  const response: CommonChallengeResoponse = {
    commonChallengeId: 1,
    content: '산책하기',
    attendFlag: false,
    compFlag: false,
    compCnt: 100,
    maxCnt: 100,
    unit: [30, 60, 100, 212],
  };

  useEffect(() => {
    setAttendCnt(response.unit[response.unit.length - 1]); //마지막 요소는 참여자수
    setAttendFlag(response.attendFlag);
    setCompFlag(response.compFlag);
    console.log(attendCnt);
  }, []);

  const handleCertification = () => {};

  const handleAttend = () => {};

  const handleNavigate = () => {
    navigate(commonChallengeDetailPage.path, {
      state: {
        attendFlag: attendFlag,
        compFlag: compFlag,
        attendCnt: attendCnt,
        compCnt: response.compCnt,
        maxCnt: response.maxCnt,
        unit: response.unit,
      },
    });
  };

  const headerRightButton = (
    <IconButton onClick={handleNavigate}>
      <ArrowRight />
    </IconButton>
  );

  return (
    <>
      <Challenge
        headerLeft={<HeaderLeft challengeCategory='공동' />}
        headerRight={<HeaderRight button={headerRightButton} />}
        bottomLeft={
          <BottomLeft
            icon={<User2 size={16} />}
            content={`${response.compCnt}/${response.maxCnt}`}
          />
        }
        bottomRight={
          compFlag ? (
            <BadgeCheck color={orange300} />
          ) : attendFlag ? (
            <BottomButton title={'인증'} onClick={handleCertification} />
          ) : (
            <BottomButton title={'참여'} onClick={handleAttend} />
          )
        }
        content={response.content}
      />
    </>
  );
};

export default CommonChallenge;
