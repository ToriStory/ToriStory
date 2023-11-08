import { useAtomValue } from 'jotai';
import { attendCntAtom, compCntAtom } from 'stores/challengeStore';
import { cls } from 'utils/cls';

interface CommonChallengeInfoProps {
  maxCnt: number;
  content: string;
}

const CommonChallengeInfo = ({ maxCnt, content }: CommonChallengeInfoProps) => {
  const attendCnt = useAtomValue(attendCntAtom);
  const compCnt = useAtomValue(compCntAtom);
  const remain = maxCnt - compCnt;

  return (
    <>
      <div className={cls('m-4 p-2 bg-orange-50 rounded-md px-10 text-lg text-orange-600')}>
        {remain > 0 ? <>다음 도토리까지 앞으로 {remain}명!</> : <>모든 도토리를 얻었습니다!</>}
      </div>
      <div className={cls('mt-1 text-3xl text-orange-600')}>참여자 {attendCnt}명</div>
      <div className={cls('m-1 mb-6 text-2xl text-orange-600')}>{content}</div>
    </>
  );
};

export default CommonChallengeInfo;
