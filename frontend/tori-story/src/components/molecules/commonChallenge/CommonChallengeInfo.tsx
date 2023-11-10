import { useAtomValue } from 'jotai';
import { attendCntAtom, compCntAtom } from 'stores/challengeStore';
import { cls } from 'utils/cls';
import HelpButton from '../buttons/HelpButton';
import { DialogContentText } from '@mui/material';

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
      <div
        className={cls(
          'flex items-center gap-2 m-4 p-2 bg-orange-50 rounded-md px-8 text-lg text-orange-600'
        )}
      >
        {remain > 0 ? <>마지막 도토리까지 앞으로 {remain}명!</> : <>모든 도토리를 얻었습니다!</>}
        <HelpButton
          content={
            <DialogContentText>
              완료한 사람은 완료 인원수에 따라 도토리를 누적해서 받을 수 있습니다. 목표 인원수를
              달성한 이후에 추가로 완료한 사람도 도토리를 받을 수 있습니다.
            </DialogContentText>
          }
        />
      </div>
      <div className={cls('mt-1 text-3xl text-orange-600')}>참여자 {attendCnt}명</div>
      <div className={cls('m-1 mb-6 text-2xl text-orange-600')}>{content}</div>
    </>
  );
};

export default CommonChallengeInfo;
