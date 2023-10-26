import { AddButton } from 'components/atoms/iconButtons/AddButton';
import OtherCustomChallengeList from 'components/organisms/challenge/OtherCustomChallengeList';
import useAppNavigation from 'hooks/useAppNavigation';
import { cls } from 'utils/cls';

const TogetherChallenge = () => {
  const navigation = useAppNavigation();

  return (
    <>
      <div className='h-full w-full fixed -z-30  left-0 top-0 flex justify-center items-center bg-white opacity-80 before:w-full before:h-full before:bg-[url("/background.jpg")] before:bg-cover before:bg-no-repeat before:bg-[center_left_30%] before:sm:bg-center' />
      <div className={cls(' h-full ')}>
        <OtherCustomChallengeList />
        <div className={cls('fixed bottom-16 right-4')}>
          <AddButton onClick={navigation.navigateToTogetherChallengeCreate} size={36} />
        </div>
      </div>
    </>
  );
};

export default TogetherChallenge;
