/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './MyChallengeCustom.css';
import moment from 'moment-timezone';
import { getMyChallengeMonthAPI } from 'apis/challengeApi';
import MyCalendarChallengeList from 'components/organisms/challenge/MyCalendarChallenge';
import Label from 'components/atoms/challenge/Label';

moment.tz.setDefault('Asia/Seoul');
export function MyChallengeCalendar() {
  const curDate = new Date();
  const [value, setValue] = useState<Date>(curDate);
  const onChange = (val: Date) => {
    setValue(val);
  };
  const selectedDate = moment(value).format('YYYY-MM-DD');
  const [activeDate, setActiveDate] = useState(selectedDate);
  const [dayList, setDayList] = useState<string[]>([]);

  useEffect(() => {
    const getMonthChallenge = async () => {
      const res = await getMyChallengeMonthAPI({ date: activeDate });
      if (res.status === 200) {
        console.log(res);
        setDayList(res.data.data);
      }
    };
    getMonthChallenge();
  }, [activeDate]);

  const getActiveDate = (activeStartDate: moment.MomentInput) => {
    const newActiveDate = moment(activeStartDate).format('YYYY-MM-DD');
    setActiveDate(newActiveDate);
  };

  // 각 날짜 타일에 컨텐츠 추가
  const addContent = ({ date }: any) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];
    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList?.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      contents.push(<div key={date} className=' w-2 h-2 rounded-full bg-[#772900]'></div>);
    }
    return (
      <div key={date} className='w-full h-full flex justify-center p-2'>
        {contents}
      </div>
    ); // 각 날짜마다 해당 요소가 들어감
  };
  return (
    <div>
      <Calendar
        calendarType='US'
        locale='ko'
        onChange={onChange as any}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(_locale, date) => moment(date).format('D')}
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
      <div className='w-full'>
        <Label title='감사일기' />
      </div>
      <div className='w-full'>
        <Label title='참여했던 도전들' />
      </div>
      <MyCalendarChallengeList activeDate={selectedDate} />
    </div>
  );
}
