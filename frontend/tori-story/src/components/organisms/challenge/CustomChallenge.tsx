import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
// import useAppNavigation from 'hooks/useAppNavigation';
import { IconButton } from '@mui/material';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { X } from 'lucide-react';
import { cls } from 'utils/cls';

export interface CustomChallengeProps {
  id: number;
  content: string;
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
  // const navigate = useAppNavigation();

  const handleCompleted = () => {
    // navigate.navigateToMemory();
    if (completeChallenge) {
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

  const button = (
    <>
      <IconButton onClick={handleDelete}>
        <X size={20} className={cls('text-gray-400')} />
      </IconButton>
    </>
  );

  return (
    <>
      {props.compFlag === true ? (
        <></>
      ) : (
        <Challenge
          headerLeft={<HeaderLeft challengeCategory='자유' />}
          headerRight={<HeaderRight button={button} />}
          //   bottomRight={<BottomButton title='기록' onClick={handleMemory} />}
          bottomRight={<BottomButton title='완료' onClick={handleCompleted} />}
          content={props.content}
        />
      )}
    </>
  );
};

export default CustomChallenge;
