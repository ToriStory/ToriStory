import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import Challenge from './Challenge';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { IconButton } from '@mui/material';
import { ArrowRight, User2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { commonChallengeDetailPage } from 'constants/pathname';
import BottomLeft from 'components/molecules/challenge/BottomLeft';
import { useEffect, useState } from 'react';
import CommonButton from 'components/molecules/commonChallenge/CommonButton';
import { useAtom, useSetAtom } from 'jotai';
import { attendFlagAtom, compFlagAtom, attendCntAtom, compCntAtom } from 'stores/challengeStore';
import { getCommonChallengeAPI } from './../../../apis/challengeApi';

interface CommonChallengeResoponse {
  commonChallengeId: number;
  content: string;
  attendFlag: boolean;
  compFlag: boolean;
  attendCnt: number;
  compCnt: number;
  unit: number[];
}

const CommonChallenge = () => {
  const navigate = useNavigate();
  const setAttendFlag = useSetAtom(attendFlagAtom);
  const setCompFlag = useSetAtom(compFlagAtom);
  const [attendCnt, setAttendCnt] = useAtom(attendCntAtom);
  const [compCnt, setCompCnt] = useAtom(compCntAtom);
  const [response, setResponse] = useState<CommonChallengeResoponse>();

  useEffect(() => {
    getCommonChallenge();
  }, []);

  const getCommonChallenge = async () => {
    const result = await getCommonChallengeAPI();
    if (result.status === 200) {
      setResponse(result.data.data);
    }
  };

  useEffect(() => {
    if (response) {
      setAttendCnt(response.attendCnt); //마지막 요소는 참여자수
      setCompCnt(response.compCnt);
      setAttendFlag(response.attendFlag);
      setCompFlag(response.compFlag);
    }
  }, [response]);

  const handleNavigate = () => {
    navigate(commonChallengeDetailPage.path, {
      state: {
        commonChallengeId: response?.commonChallengeId,
        maxCnt: response?.unit[response?.unit.length - 1],
        unit: response?.unit,
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
        bottomRight={
          response ? <CommonButton commonChallengeId={response.commonChallengeId} /> : <></>
        }
        content={response ? response.content : 'Loading...'}
      />
    </>
  );
};

export default CommonChallenge;
