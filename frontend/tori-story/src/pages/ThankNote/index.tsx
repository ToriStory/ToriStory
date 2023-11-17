import Label from 'components/atoms/challenge/Label';
import { cls } from 'utils/cls';
import { AddButton } from 'components/atoms/iconButtons/AddButton';
import { useNavigate } from 'react-router-dom';
import { createThankNotePage } from 'constants/pathname';
import ThankNoteList from 'components/organisms/thankNote/ThankNoteList';
import ThankQuote from 'components/organisms/thankNote/ThankQuote';
import { getThankNoteStatisticsAPI } from 'apis/thankNote';
import { useAtomValue } from 'jotai';
import { canAddThankNoteAtom } from 'stores/thankNote';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const ThankNote = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const today = new Date();
  const todayDate = dayjs(today).format('YYYY-MM-DD');
  const canAddThankNote = useAtomValue(canAddThankNoteAtom);
  const [thankNoteStatistics, setThankNoteStatistics] = useState<{
    totalCnt: number;
    continueCnt: number;
  }>({ totalCnt: 0, continueCnt: 0 });
  const handleCreateThankNoteButton = () => {
    navigate(createThankNotePage.path, {
      state: {
        content: '',
        id: -1,
      },
    });
  };
  useEffect(() => {
    const getThankNoteStatistics = async () => {
      const res = await getThankNoteStatisticsAPI();
      setThankNoteStatistics(res.data.data);
    };
    getThankNoteStatistics();
  }, []);

  return (
    <>
      {accessToken ? (
        <>
          <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center before:opacity-80' />
          <div className={cls('max-h-full overflow-y-auto')}>
            <div className='sticky top-0'>
              <Label title={dayjs(today).format('YYYY년 MM월 DD일')} />
            </div>
            <div className='flex flex-col items-center justify-center text-xl'>
              <div>연속 {thankNoteStatistics.continueCnt}일째 작성 중!</div>
              <div>지금까지 총 {thankNoteStatistics.totalCnt}일 동안 감사일기를 작성했어요</div>
            </div>
            <Label title='오늘의 일기' />
            <ThankNoteList activeDate={todayDate} />
            <br />

            {canAddThankNote && (
              <div className={cls('fixed w-full inset-x-0 bottom-16 z-20')}>
                <div className={cls('flex justify-center my-1')}>
                  <AddButton title='일기 작성' onClick={() => handleCreateThankNoteButton()} />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center before:opacity-80' />
          <div className={cls('max-h-full overflow-y-auto pb-12')}>
            <Label title={dayjs(today).format('YYYY년 MM월 DD일')} />
            <div className='flex flex-col items-center justify-center'>
              <div>로그인 후 감사일기를 써보세요!</div>
            </div>
            <Label title='감사 문구' />
            <ThankQuote />
          </div>
        </>
      )}
    </>
  );
};

export default ThankNote;