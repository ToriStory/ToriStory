/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './MyCalendar.css';
import { getMyChallengeMonthAPI } from 'apis/challengeApi';
import MyCalendarChallengeList from 'components/organisms/challenge/MyCalendarChallenge';
import Label from 'components/atoms/challenge/Label';
import { getMonthlyThankNoteAPI } from 'apis/thankNote';
import ThankNoteList from 'components/organisms/thankNote/ThankNoteList';
import useBottomSheet from 'hooks/useBottomSheet';
import dayjs from 'dayjs';

export function MyCalendar() {
  const curDate = new Date();
  const [value, setValue] = useState<Date>(curDate);
  const onChange = (val: Date) => {
    setValue(val);
  };
  const { openPopup, component } = useBottomSheet();
  const selectedDate = dayjs(value).format('YYYY-MM-DD');
  const [activeDate, setActiveDate] = useState(selectedDate);
  const [challengeDayList, setChallengeDayList] = useState<string[]>([]);
  const [thankNoteDayList, setThankNoteDayList] = useState<string[]>([]);
  useEffect(() => {
    const getMonthChallenge = async () => {
      const res = await getMyChallengeMonthAPI({ date: activeDate });
      if (res.status === 200) {
        setChallengeDayList(res.data.data);
      }
    };
    const getMonthThank = async () => {
      const res = await getMonthlyThankNoteAPI({ date: activeDate });
      if (res.status === 200) {
        setThankNoteDayList(res.data.data);
      }
    };
    getMonthChallenge();
    getMonthThank();
  }, [activeDate]);

  const getActiveDate = (activeStartDate: Date | null) => {
    const newActiveDate = dayjs(activeStartDate).format('YYYY-MM-DD');
    setActiveDate(newActiveDate);
  };

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }: any) => {
    const title = (
      <div className='h-auto my-2 sticky top-0 w-full flex justify-center items-center'>
        <div className=' font-bold text-center text-2xl text-orange-800 bg-orange-50 rounded-lg w-fit px-2'>
          {dayjs(date).format('YYYY년 MM월 DD일')}
        </div>
      </div>
    );
    const component = (
      <>
        <div className='h-full w-full fixed -z-30 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-no-repeat before:sm:bg-center' />
        <div className='w-full h-full px-2'>
          <div className='w-full'>
            <Label title='감사일기' />
          </div>

          <ThankNoteList activeDate={dayjs(date).format('YYYY-MM-DD')} />
          <div className='w-full'>
            <Label title='참여했던 도전들' />
          </div>
          <MyCalendarChallengeList activeDate={dayjs(date).format('YYYY-MM-DD')} />
        </div>
      </>
    );
    const content = (
      <div
        className='w-full h-full flex justify-center items-center'
        onClick={() => openPopup(component, title)}
      >
        <div key={date} className=' w-2 h-2 rounded-full bg-[#772900]'></div>
      </div>
    );
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];
    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (challengeDayList?.find((day) => day === dayjs(date).format('YYYY-MM-DD'))) {
      contents.push(content);
    }
    if (thankNoteDayList?.find((day) => day === dayjs(date).format('YYYY-MM-DD'))) {
      contents.push(content);
    }
    return (
      <div key={date} className='w-full h-full flex justify-center p-2'>
        {contents}
      </div>
    ); // 각 날짜마다 해당 요소가 들어감
  };
  return (
    <div>
      {component}
      <Calendar
        calendarType='US'
        locale='ko'
        onChange={onChange as any}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(_locale, date) => dayjs(date).format('D')}
        tileClassName={({ date, view }) =>
          view === 'month'
            ? date.getDay() === 1
              ? 'Mon'
              : date.getDay() === 2
              ? 'Tue'
              : date.getDay() === 3
              ? 'Wed'
              : date.getDay() === 4
              ? 'Thu'
              : date.getDay() === 5
              ? 'Fri'
              : date.getDay() === 6
              ? 'Sat'
              : date.getDay() === 0
              ? 'Sun'
              : null
            : null
        }
        tileContent={addContent}
        showNeighboringMonth={false}
        onActiveStartDateChange={({ activeStartDate }) => getActiveDate(activeStartDate)}
      />
    </div>
  );
}
