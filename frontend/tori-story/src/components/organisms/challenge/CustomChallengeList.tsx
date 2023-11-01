import CustomChallenge, { CustomChallengeProps } from './CustomChallenge';
import SuccessChallenge from './SuccessChallenge';
import { useEffect, useState } from 'react';
import { getMyCustomChallengeAPI } from 'apis/challengeApi';
import useSWR from 'swr';
import {
  deleteCustomChallengeApi,
  readInProgressCustomChallengeApi,
  patchCustomChallengeApi,
} from 'apis/challengeApi';
import { toast } from 'react-toastify';
import { cls } from 'utils/cls';

export interface CustomChallengeListResponse {
  data: CustomChallengeProps[];
}
interface CustomChallengeListProps {
  isMyChallenge?: boolean;
}
const CustumChallengeList = ({ isMyChallenge = false }: CustomChallengeListProps) => {
  const { data: myCustomChallengeData } = useSWR('/api/challenge/custom', getMyCustomChallengeAPI);
  const [data, setData] = useState<CustomChallengeProps[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    if (isMyChallenge) {
      if (myCustomChallengeData?.data && myCustomChallengeData?.data.length > 0) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
    }
  }, [isMyChallenge, myCustomChallengeData]);

  useEffect(() => {
    getInProgressCustomChallengeApi();
  }, []);

  const getInProgressCustomChallengeApi = async () => {
    const result = await readInProgressCustomChallengeApi();
    if (result.status === 200) {
      const data: CustomChallengeProps[] = result.data.data;
      setData(data);
      data.map((item) => {
        if (item.compFlag === false) {
          setIsEmpty(false); // 달성되지 않은 도전과제만 표시함
        }
      });
    }
  };

  const handleDelete = async (id: number) => {
    const result = await toast.promise(deleteCustomChallengeApi(id), {
      pending: '도전 삭제 처리 중입니다',
      success: '도전이 삭제되었습니다!',
      error: '도전 삭제에 실패했습니다',
    });
    if (result?.data.code === 200) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    } else {
      console.log(`${result?.data.code} 에러`);
    }
  };

  const handleCompleted = async (id: number) => {
    const result = await toast.promise(patchCustomChallengeApi(id), {
      pending: '도전 완료 처리 중입니다',
      success: '도전이 완료되었습니다!',
      error: '도전 완료에 실패했습니다',
    });
    if (result?.data.code === 200) {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, compFlag: true };
        }
        return item;
      });
      setData(updatedData);
    } else {
      console.log(`${result?.data.code} 에러`);
    }
  };

  return (
    <div className={cls('h-full')}>
      {isMyChallenge
        ? myCustomChallengeData?.data &&
          myCustomChallengeData?.data.map((item) => {
            return (
              <CustomChallenge
                key={item.id}
                props={item}
                deleteChallenge={handleDelete}
                completeChallenge={handleCompleted}
                isMyChallenge
              />
            );
          })
        : data &&
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
    </div>
  );
};

export default CustumChallengeList;
