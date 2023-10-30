import { readInProgressCustomChallengeApi } from 'apis/challengeApi';
import CustomChallenge, { CustomChallengeProps } from './CustomChallenge';
import SuccessChallenge from './SuccessChallenge';
import { useEffect, useState } from 'react';
import { getMyCustomChallengeAPI } from 'apis/challengeApi';
import useSWR from 'swr';

export interface CustomChallengeListResponse {
  data: CustomChallengeProps[];
}
interface CustomChallengeListProps {
  isMyChallenge?: boolean;
}
const CustumChallengeList = ({ isMyChallenge = false }: CustomChallengeListProps) => {
  const { data: myCustomChallengeData } = useSWR('/api/challenge/custom', getMyCustomChallengeAPI);
  console.log(myCustomChallengeData);
  const [data, setData] = useState<CustomChallengeProps[]>([]);

  useEffect(() => {
    getInProgressCustomChallengeApi();
  }, []);

  const getInProgressCustomChallengeApi = async () => {
    const result = await readInProgressCustomChallengeApi();
    if (result.status === 200) {
      console.log(result.data.data);
      setData(result.data.data);
    }
  };

  let isEmpty: boolean = true;

  const handleDelete = async () =>
    // customEntryId: number
    {
      // const result = await toast.promise(deleteCustomChallengeApi(customEntryId), {
      //   pending: '도전 삭제 처리 중입니다',
      //   success: '도전이 삭제되었습니다!',
      //   error: '도전 삭제에 실패했습니다',
      // });
      // if (result?.data.code === 200) {
      //   const updatedData = data.filter((item) => item.customEntryId !== customEntryId);
      //   setData(updatedData);
      // } else {
      //   console.log(`${result?.data.code} 에러`);
      // }
    };

  const handleCompleted = async () =>
    // customEntryId: number
    {
      // const result = await toast.promise(patchCustomChallengeApi(customEntryId), {
      //   pending: '도전 완료 처리 중입니다',
      //   success: '도전이 완료되었습니다!',
      //   error: '도전 완료에 실패했습니다',
      // });
      // if (result?.data.code === 200) {
      //   const updatedData = data.map((item) => {
      //     if (item.customEntryId === customEntryId) {
      //       return { ...item, compFlag: true };
      //     }
      //     return item;
      //   });
      //   setData(updatedData);
      // } else {
      //   console.log(`${result?.data.code} 에러`);
      // }
    };

  return (
    <div className='h-full'>
      {isMyChallenge
        ? myCustomChallengeData?.data.map((item) => {
            isEmpty = false;
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
            if (item.compFlag === false) {
              isEmpty = false; // 달성되지 않은 도전과제만 표시함
            }
            return (
              <CustomChallenge
                key={item.id}
                props={item}
                deleteChallenge={handleDelete}
                completeChallenge={handleCompleted}
              />
            );
          })}
      {isMyChallenge
        ? myCustomChallengeData?.data.map((item) => {
            isEmpty = false;
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
        : data.map((item) => {
            if (item.compFlag === false) {
              isEmpty = false; // 달성되지 않은 도전과제만 표시함
            }
            return (
              <CustomChallenge
                key={item.id}
                props={item}
                deleteChallenge={handleDelete}
                completeChallenge={handleCompleted}
              />
            );
          })}
      {isEmpty ? (
        <SuccessChallenge title='새로운 도전과제를 만들어보세요!'></SuccessChallenge>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustumChallengeList;
