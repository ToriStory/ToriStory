import Label from 'components/atoms/challenge/Label';
import RandomChallenge from 'components/organisms/challenge/RandomChallenge';
import { cls } from 'utils/cls';
import CustomChallengeList from 'components/organisms/challenge/CustomChallengeList';

const MyChallenge = () => {
  const nickname = '하늘';

  return (
    <>
      <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center' />
      <div className={cls(' h-full overflow-y-auto')}>
        <Label title='랜덤 도전' />
        <RandomChallenge />
        <br />
        <Label title={`${nickname}님의 도전`} />
        <CustomChallengeList />
      </div>
    </> 
  );
};

export default MyChallenge;
