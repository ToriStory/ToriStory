import BottomButton from 'components/atoms/challenge/BottomButton';
import { orange300 } from 'constants/color';
import { BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import OnceDialog from '../modals/OnceDialog';
import ChoiceDialog from '../modals/ChoiceDialog';
import { useAtom } from 'jotai';
import { attendCntAtom, attendFlagAtom, compCntAtom, compFlagAtom } from 'stores/challengeStore';
import { useNavigate } from 'react-router-dom';
import { commonChallengeReviewPage } from 'constants/pathname';
import { patchCommonChallengeCompleteAPI, postCommonChallengeAttendAPI } from 'apis/challengeApi';
import { toast } from 'react-toastify';
import { DialogContentText } from '@mui/material';

const CommonButton = ({ commonChallengeId }: { commonChallengeId: number }) => {
  const navigate = useNavigate();
  const [attendFlag, setAttendFlag] = useAtom(attendFlagAtom);
  const [compFlag, setCompFlag] = useAtom(compFlagAtom);
  const [openAttendModal, setOpenAttendModal] = useState(false);
  const [openCompModal, setOpenCompModal] = useState(false);
  const [attendCnt, setAttendCnt] = useAtom(attendCntAtom);
  const [compCnt, setCompCnt] = useAtom(compCntAtom);

  const handleComplete = async () => {
    const res = await patchCommonChallengeCompleteAPI(commonChallengeId);
    if (res.status === 200) {
      setCompCnt(compCnt + 1);
      setCompFlag(true);
      setOpenCompModal(true);
    } else {
      toast.error('완료에 실패하였습니다.');
    }
  };

  const handleAttend = async () => {
    const res = await postCommonChallengeAttendAPI();
    if (res.status === 201) {
      setAttendCnt(attendCnt + 1);
      setAttendFlag(true);
      setOpenAttendModal(true);
    } else {
      toast.error('참여 신청에 실패하였습니다.');
    }
  };

  const handleNavigateReview = () => {
    navigate(commonChallengeReviewPage.path, {
      state: { commonChallengeId: commonChallengeId, beforePage: location.pathname },
    });
  };

  return (
    <div>
      {compFlag ? (
        <BadgeCheck color={orange300} />
      ) : attendFlag ? (
        <BottomButton title={'완료'} onClick={handleComplete} />
      ) : (
        <BottomButton title={'참여'} onClick={handleAttend} />
      )}
      <OnceDialog
        content='참여가
        완료되었습니다'
        buttonTitle='확인'
        openModal={openAttendModal}
        setIsModalOpen={setOpenAttendModal}
      />
      <ChoiceDialog
        openModal={openCompModal}
        setIsModalOpen={setOpenCompModal}
        content={
          <>
            <DialogContentText>완료되었습니다.</DialogContentText>
            <DialogContentText>사진을 공유하시겠습니까?</DialogContentText>
          </>
        }
        rigthButtonTitle='사진 찍기'
        rightButtonOnClick={handleNavigateReview}
      />
    </div>
  );
};

export default CommonButton;
