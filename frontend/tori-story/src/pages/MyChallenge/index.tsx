import Label from 'components/atoms/challenge/Label';
import RandomChallenge from 'components/organisms/challenge/RandomChallenge';
import { cls } from 'utils/cls';

const MyChallenge = () => {
  const nickname = '하늘';

  return (
    <div className={cls(' h-full overflow-y-auto')}>
      <Label title='랜덤 도전' />
      <RandomChallenge />
      <br />
      <Label title={`${nickname}님의 도전`} />
    </div>
  );
};

export default MyChallenge;
