import CustomChallenge, { CustomChallengeProps } from './CustomChallenge';
import SuccessChallenge from './SuccessChallenge';
import { useEffect, useState } from 'react';
import {
  deleteCustomChallengeApi,
  patchCustomChallengeApi,
  getMyChallengeDailyAPI,
  ChallengeDailyResponse,
} from 'apis/challengeApi';
import { toast } from 'react-toastify';
import { cls } from 'utils/cls';

export interface CustomChallengeListResponse {
  data: CustomChallengeProps[];
}
interface MyCalendarChallengeListProps {
  activeDate: string;
}
const MyCalendarChallengeList = (props: MyCalendarChallengeListProps) => {
  const { activeDate } = props;
  const [data, setData] = useState<ChallengeDailyResponse[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const getDailyChallenge = async () => {
      const res = await getMyChallengeDailyAPI({ date: activeDate });
      if (res.status === 200) {
        console.log(res);
        setData(res.data.data);
      }
    };
    getDailyChallenge();
  }, [activeDate]);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [data]);

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
      {data &&
        data?.map((item) => {
          return (
            <CustomChallenge
              key={item.id}
              props={item}
              deleteChallenge={handleDelete}
              completeChallenge={handleCompleted}
              isMyChallenge
            />
          );
        })}
      {isEmpty && <SuccessChallenge title='새로운 도전과제를 만들어보세요!'></SuccessChallenge>}
    </div>
  );
};

export default MyCalendarChallengeList;
