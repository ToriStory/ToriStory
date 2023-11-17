import CustomChallenge, { CustomChallengeProps } from './CustomChallenge';
import SuccessChallenge from './SuccessChallenge';
import { useEffect, useState } from 'react';
import {
  deleteCustomChallengeApi,
  readInProgressCustomChallengeApi,
  patchCustomChallengeApi,
} from 'apis/challengeApi';
import { toast } from 'react-toastify';
import { cls } from 'utils/cls';
import ChoiceDialog from 'components/molecules/modals/ChoiceDialog';
import { DialogContentText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { customChallengeMemoryPage } from 'constants/pathname';
import OnceDialog from 'components/molecules/modals/OnceDialog';

export interface CustomChallengeListResponse {
  data: CustomChallengeProps[];
}

const CustomChallengeList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<CustomChallengeProps[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [openCompModal, setOpenCompModal] = useState<boolean>(false);
  const [openCompImgModal, setOpenCompImgModal] = useState<boolean>(false);
  const [customEntryId, setCustomEntryId] = useState<number>();

  useEffect(() => {
    getInProgressCustomChallengeApi();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [data]);

  const getInProgressCustomChallengeApi = async () => {
    const result = await readInProgressCustomChallengeApi();
    if (result.status === 200) {
      const data: CustomChallengeProps[] = result.data.data;
      setData(data);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await deleteCustomChallengeApi(id);
    if (result?.data.code === 200) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    } else {
      toast.error('도전 삭제에 실패했습니다');
    }
  };

  const handleCompleted = async (id: number) => {
    const result = await patchCustomChallengeApi(id);
    if (result.data.code === 200) {
      let imgUrl: null | string = null;
      const updatedData = data.map((item) => {
        if (item.id === id) {
          imgUrl = item.imgUrl;
          return { ...item, compFlag: true };
        }
        return item;
      });
      setData(updatedData);
      setCustomEntryId(id);
      imgUrl === null ? setOpenCompImgModal(true) : setOpenCompModal(true);
    } else {
      toast.error('도전 완료에 실패했습니다');
    }
  };

  const handleNavigateMemory = () => {
    navigate(customChallengeMemoryPage.path, {
      state: { customEntryId: customEntryId },
    });
  };

  return (
    <div className={cls('h-full')}>
      {data &&
        data?.map((item) => {
          return (
            <CustomChallenge
              key={item.id}
              props={item}
              deleteChallenge={handleDelete}
              completeChallenge={handleCompleted}
            />
          );
        })}
      {isEmpty && <SuccessChallenge title='새로운 도전과제를 만들어보세요!'></SuccessChallenge>}
      <OnceDialog
        content='완료되었습니다'
        buttonTitle='확인'
        openModal={openCompModal}
        setIsModalOpen={setOpenCompModal}
      />
      <ChoiceDialog
        openModal={openCompImgModal}
        setIsModalOpen={setOpenCompImgModal}
        content={
          <>
            <DialogContentText>완료되었습니다.</DialogContentText>
            <DialogContentText>추억으로 사진을 남기시겠습니까?</DialogContentText>
          </>
        }
        rigthButtonTitle='추억 남기기'
        rightButtonOnClick={handleNavigateMemory}
      />
    </div>
  );
};

export default CustomChallengeList;
