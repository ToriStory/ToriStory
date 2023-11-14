/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import ThankNoteCard from './ThankNote';
import SuccessChallenge from '../challenge/SuccessChallenge';
import { getDailyThankNoteAPI } from 'apis/thankNote';
import { useSetAtom } from 'jotai';
import { canAddThankNoteAtom } from 'stores/thankNote';

interface ThankNoteListProps {
  activeDate: string;
}
const ThankNoteList = ({ activeDate }: ThankNoteListProps) => {
  const [data, setData] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const setCanAddThankNote = useSetAtom(canAddThankNoteAtom);
  useEffect(() => {
    const getDailyThankNote = async () => {
      const res = await getDailyThankNoteAPI({ date: activeDate });
      if (res.status === 200) {
        console.log(res);
        res.data.data.content ? setData(JSON.parse(res.data.data.content)) : setData([]);
      }
    };
    getDailyThankNote();
  }, [activeDate]);
  useEffect(() => {
    if (data && data?.length > 0) {
      setIsEmpty(false);
      setCanAddThankNote(false);
    } else {
      setIsEmpty(true);
      setCanAddThankNote(true);
    }
  }, [data, setCanAddThankNote]);

  return (
    <div className={cls('h-fit')}>
      {isEmpty ? (
        <SuccessChallenge title='오늘의 감사일기를 써보세요!'></SuccessChallenge>
      ) : (
        data &&
        data.map((item: string, i: number) => {
          return <ThankNoteCard key={i} content={item} />;
        })
      )}
    </div>
  );
};

export default ThankNoteList;
