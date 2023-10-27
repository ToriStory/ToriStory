import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
// import useAppNavigation from 'hooks/useAppNavigation';
import { IconButton } from '@mui/material';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { Siren, X } from 'lucide-react';
import { cls } from 'utils/cls';
import { useState } from 'react';
import ChoiceModal from 'components/molecules/modals/ChoiceModal';
import useAppNavigation from 'hooks/useAppNavigation';

export interface CustomChallengeProps {
  id: number;
  content: string;
  scrapCnt?: number;
  reportCnt?: number;
  regDtm?: number;
  startDt?: string;
  endDt?: string;
  compFlag?: boolean;
  imgUrl?: string;
}

const CustomChallenge = ({
  props,
  deleteChallenge,
  completeChallenge,
}: {
  props: CustomChallengeProps;
  deleteChallenge?: (id: number) => void;
  completeChallenge?: (id: number) => void;
}) => {
  const navigate = useAppNavigation();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const rightBottomButtonLabel = props.regDtm ? '나도!' : '완료';

  const handleCompleted = () => {
    // navigate.navigateToMemory();
    if (completeChallenge) {
      setOpenModal(true);
      completeChallenge(props.id);
    }
  };

  const handleDelete = () => {
    if (deleteChallenge) {
      alert('삭제하시겠습니까?');
      deleteChallenge(props.id);
      // 삭제 request
    }
  };

  const handleReport = () => {
    alert('신고하시겠습니까?');
  };

  const button = (
    <>
      {'together' in location ? (
        <IconButton onClick={handleReport}>
          <Siren size={20} className={cls('text-gray-400')} />
        </IconButton>
      ) : (
        <IconButton onClick={handleDelete}>
          <X size={20} className={cls('text-gray-400')} />
        </IconButton>
      )}
    </>
  );

  const handleCancelButton = () => {
    setOpenModal(false);
  };

  const handleJoinButton = () => {
    navigate.navigateToTogetherChallengeCreate();
  };

  const handleRightBottomButton = () => {
    {
      'together' in location ? handleCompleted : handleReport;
    }
  };

  return (
    <>
      {openModal && (
        <ChoiceModal
          cancelButtonLabel={'취소하기'}
          cancelButtonAction={() => handleCancelButton()}
          okayButtonLabel={'참여하기'}
          okayButtonAction={() => handleJoinButton()}
          setIsModalOpen={setOpenModal}
        >
          <div className={cls('my-4 text-center')}>
            <div className={cls('font-bold text-lg text-gray-800')}>도전명: {props.content}</div>
            <div>해당 도전을 가져오시겠습니까?</div>
          </div>
        </ChoiceModal>
      )}
      {props.compFlag === true ? (
        <></>
      ) : (
        <Challenge
          headerLeft={<HeaderLeft challengeCategory='자유' />}
          headerRight={<HeaderRight button={button} />}
          //   bottomRight={<BottomButton title='기록' onClick={handleMemory} />}
          bottomRight={
            <BottomButton title={rightBottomButtonLabel} onClick={handleRightBottomButton} />
          }
          content={props.content}
        />
      )}
    </>
  );
};

export default CustomChallenge;
