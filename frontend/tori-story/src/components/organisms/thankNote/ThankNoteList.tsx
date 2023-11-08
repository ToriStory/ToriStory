/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import ThankNoteCard from './ThankNote';
import SuccessChallenge from '../challenge/SuccessChallenge';

const data = [
  {
    content: `오늘은 건강하고 안전한 하루를 보낼 수 있어서 감사하다. 가족과 함께한 시간과 배운 것들에도 감사하며, 미래를 기대하며 하루를 마무리한다.
    `,
  },
  {
    content: `오늘은 친구의 지지와 조언을 받았고, 그로 인해 자신감을 얻었다. 진정한 친구에 대한 감사를 느낀다.
   `,
  },
  {
    content: `이른 아침 새소리를 듣며 자연과 조화로운 순간을 즐겼다. 자연의 아름다움에 대한 감사를 표현하고 싶다.
   `,
  },
];
const ThankNoteList = () => {
  // const [data, setData] = useState<ThankNoteResponse[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  // const activeDate = new Date();

  useEffect(() => {
    const getDailyChallenge = async () => {
      // const res = await getMyChallengeDailyAPI({ date: activeDate });
      // if (res.status === 200) {
      //   console.log(res);
      //   // setData(res.data.data);
      // }
    };
    getDailyChallenge();
  }, []);

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     setIsEmpty(false);
  //   } else {
  //     setIsEmpty(true);
  //   }
  // }, [data]);

  return (
    <div className={cls('h-full')}>
      {isEmpty ? (
        <SuccessChallenge title='오늘의 감사일기를 써보세요!'></SuccessChallenge>
      ) : (
        data &&
        data?.map((item, i) => {
          return <ThankNoteCard key={i} content={item.content} />;
        })
      )}
    </div>
  );
};

export default ThankNoteList;
