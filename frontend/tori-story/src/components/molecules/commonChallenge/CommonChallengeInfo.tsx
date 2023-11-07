import { cls } from 'utils/cls';

interface CommonChallengeInfoProps {
  attendCnt: number;
  content: string;
}

const CommonChallengeInfo = ({ attendCnt, content }: CommonChallengeInfoProps) => {
  //   const { attendCnt, content, compCnt } = props;

  return (
    <>
      <div className={cls('m-4 p-2 bg-orange-50 rounded-md px-10 text-lg text-orange-600')}>
        다음 도토리까지 앞으로 {24}명!
      </div>
      <div className={cls('mt-1 text-3xl text-orange-600')}>참여자 {attendCnt}명</div>
      <div className={cls('m-1 mb-6 text-2xl text-orange-600')}>{content}</div>
    </>
  );
};

export default CommonChallengeInfo;
