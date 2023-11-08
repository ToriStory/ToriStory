import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import Challenge from './Challenge';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { IconButton } from '@mui/material';
import { ArrowRight, User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { commonChallengeDetailPage } from 'constants/pathname';
import BottomLeft from 'components/molecules/challenge/BottomLeft';
import { useEffect } from 'react';
import CommonButton from 'components/molecules/commonChallenge/CommonButton';
import { useAtom, useSetAtom } from 'jotai';
import { attendFlagAtom, compFlagAtom, attendCntAtom, compCntAtom } from 'stores/challengeStore';

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
  const setAttendFlag = useSetAtom(attendFlagAtom);
  const setCompFlag = useSetAtom(compFlagAtom);
  const [attendCnt, setAttendCnt] = useAtom(attendCntAtom);
  const [compCnt, setCompCnt] = useAtom(compCntAtom);

  const response: CommonChallengeResoponse = {
    commonChallengeId: 1,
    content: '산책하기',
    attendFlag: false,
    compFlag: false,
    compCnt: 200,
    maxCnt: 100,
    unit: [30, 60, 100, 212],
  };

  useEffect(() => {
    setAttendCnt(response.unit[response.unit.length - 1]); //마지막 요소는 참여자수
    setCompCnt(response.compCnt);
    setAttendFlag(response.attendFlag);
    setCompFlag(response.compFlag);
  }, []);

  const handleNavigate = () => {
    navigate(commonChallengeDetailPage.path, {
      state: {
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
        bottomLeft={<BottomLeft icon={<User2 size={16} />} content={`${compCnt}/${attendCnt}`} />}
        bottomRight={<CommonButton />}
        content={response.content}
      />
    </>
  );
};

export default CommonChallenge;
