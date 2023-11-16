import Challenge from './Challenge';
import HeaderLeft from 'components/molecules/challenge/HeaderLeft';
import HeaderRight from 'components/molecules/challenge/HeaderRight';
import { BadgeCheck, BadgeX, Image, X } from 'lucide-react';
import { gray500, orange300, orange500 } from 'constants/color';
import { useState } from 'react';
import BottomLeft from 'components/molecules/challenge/BottomLeft';
import dayjs from 'dayjs';
import BottomButton from 'components/atoms/challenge/BottomButton';
import ChoiceDialog from 'components/molecules/modals/ChoiceDialog';
import { DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { customChallengeMemoryPage } from 'constants/pathname';
import ImgDialog from 'components/molecules/modals/ImgDialog';
import { cls } from 'utils/cls';

export interface CustomChallengeProps {
  id: number;
  content: string;
  startDt?: string;
  endDt?: string | null;
  compFlag?: boolean;
  imgUrl: string | null;
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
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openMemoryModal, setOpenMemoryModal] = useState<boolean>(false);
  const [showImgModal, setShowImgModal] = useState<boolean>(false);

  const handleCompleted = () => {
    if (completeChallenge) {
      completeChallenge(props.id);
    }
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleShowImage = () => {
    if (props.imgUrl) {
      setShowImgModal(true);
    } else {
      setOpenMemoryModal(true);
    }
  };

  const handleDeleteButton = () => {
    setOpenDeleteModal(false);
    if (deleteChallenge) {
      deleteChallenge(props.id);
    }
  };

  const handleNavigateMemory = () => {
    navigate(customChallengeMemoryPage.path, {
      state: { customEntryId: props.id },
    });
  };

  const getRemainingPeriod = (): string => {
    if (!props.endDt) {
      return '상시';
    }

    const today = dayjs().startOf('day');
    const endDay = dayjs(props.endDt).startOf('day');
    const diff = endDay.diff(today, 'day');

    if (diff === 0) {
      return 'D-day';
    }
    return `D-${diff}`;
  };

  const deleteIconButton = <X size={20} color={gray500} onClick={handleDelete} />;

  const imgIconButton = <Image size={20} color={orange500} onClick={handleShowImage} />;

  return (
    <>
      {isMyChallenge ? (
        <Challenge
          headerLeft={<HeaderLeft challengeCategory='자유' otherElement={imgIconButton} />}
          headerRight={<HeaderRight button={deleteIconButton} />}
          bottomRight={
            props.compFlag ? (
              <BadgeCheck size={24} color={orange300} />
            ) : (
              <BadgeX size={16} color={gray500} />
            )
          }
          content={props.content}
        />
      ) : (
        <Challenge
          headerLeft={<HeaderLeft challengeCategory='자유' otherElement={imgIconButton} />}
          headerRight={<HeaderRight button={deleteIconButton} />}
          bottomLeft={<BottomLeft content={getRemainingPeriod()} />}
          bottomRight={
            props.compFlag ? (
              <BadgeCheck size={24} color={orange300} />
            ) : (
              <BottomButton title='완료' onClick={handleCompleted} />
            )
          }
          content={props.content}
        />
      )}
      <ChoiceDialog
        openModal={openDeleteModal}
        setIsModalOpen={setOpenDeleteModal}
        content={
          <>
            <DialogContentText>삭제하시겠습니까?</DialogContentText>
          </>
        }
        leftButtonTitle='취소'
        rigthButtonTitle='삭제'
        rightButtonOnClick={handleDeleteButton}
      />
      <ChoiceDialog
        openModal={openMemoryModal}
        setIsModalOpen={setOpenMemoryModal}
        content={
          <>
            <DialogContentText>등록된 사진이 없습니다.</DialogContentText>
            <DialogContentText>추억으로 사진을 남기시겠습니까?</DialogContentText>
          </>
        }
        rigthButtonTitle='추억 남기기'
        rightButtonOnClick={handleNavigateMemory}
      />
      {props.imgUrl && (
        <ImgDialog
          openModal={showImgModal}
          setIsModalOpen={setShowImgModal}
          children={
            <>
              <img srcSet={props.imgUrl} src={props.imgUrl} alt={props.imgUrl} loading='lazy' />
              <div className={cls('flex justify-center items-center mt-5')}>
                <BottomButton title='수정하기' onClick={handleNavigateMemory} />
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default CustomChallenge;
