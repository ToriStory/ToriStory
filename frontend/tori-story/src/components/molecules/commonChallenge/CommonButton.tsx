import BottomButton from 'components/atoms/challenge/BottomButton';
import { orange300 } from 'constants/color';
import { BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import AttendModal from '../modals/AttendModal';
import CompleteModal from '../modals/CompleteModal';
import { useAtom } from 'jotai';
import { attendCntAtom, attendFlagAtom, compCntAtom, compFlagAtom } from 'stores/challengeStore';
import { patchCommonChallengeCompleteAPI, postCommonChallengeAttendAPI } from 'apis/challengeApi';
import { toast } from 'react-toastify';

const CommonButton = ({ commonChallengeId }: { commonChallengeId: number }) => {
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

  return (
    <div>
      {compFlag ? (
        <BadgeCheck color={orange300} />
      ) : attendFlag ? (
        <BottomButton title={'완료'} onClick={handleComplete} />
      ) : (
        <BottomButton title={'참여'} onClick={handleAttend} />
      )}
      <AttendModal openModal={openAttendModal} setIsModalOpen={setOpenAttendModal} />
      <CompleteModal openModal={openCompModal} setIsModalOpen={setOpenCompModal} />
    </div>
  );
};

export default CommonButton;
