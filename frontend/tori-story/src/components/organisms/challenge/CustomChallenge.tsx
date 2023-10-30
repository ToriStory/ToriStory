import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import BottomButton from 'components/atoms/challenge/BottomButton';
// import useAppNavigation from 'hooks/useAppNavigation';
import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { BadgeCheck, BadgeX, X } from 'lucide-react';
import { cls } from 'utils/cls';
import { gray400, orange300 } from 'constants/color';
import { useState } from 'react';

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
  isMyChallenge,
}: {
  props: CustomChallengeProps;
  deleteChallenge?: (id: number) => void;
  completeChallenge?: (id: number) => void;
  isMyChallenge?: boolean;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const navigate = useAppNavigation();

  const handleCompleted = () => {
    // navigate.navigateToMemory();
    if (completeChallenge) {
      completeChallenge(props.id);
    }
  };

  const handleDelete = () => {
    setOpenModal(true);
  };

  // 모달 - 닫히는 부분
  const handleCancelButton = () => {
    setOpenModal(false);
  };

  //모달 열린 후 페이지 이동하는 부분
  const handleDeleteButton = () => {
    setOpenModal(false);
    if (deleteChallenge) {
      console.log('props:', props);
      deleteChallenge(props.id);
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
      {isMyChallenge ? (
        <Challenge
          headerLeft={<HeaderLeft challengeCategory='자유' />}
          headerRight={<HeaderRight button={button} />}
          bottomRight={
            props.compFlag ? (
              <div className='p-1'>
                <BadgeCheck color={orange300} />
              </div>
            ) : (
              <div className='p-1'>
                <BadgeX color={gray400} />
              </div>
            )
          }
          content={props.content}
        />
      ) : props.compFlag === true ? (
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
      {openModal && (
        <Dialog fullWidth open={openModal} onClose={handleCancelButton}>
          <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
            삭제하시겠습니까?
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <>
              <Button variant='contained' onClick={handleCancelButton} color='primary'>
                취소
              </Button>
              <Button variant='contained' onClick={handleDeleteButton} color='primary'>
                삭제
              </Button>
            </>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default CustomChallenge;
