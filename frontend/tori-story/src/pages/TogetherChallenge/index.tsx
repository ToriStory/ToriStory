import { AddButton } from 'components/atoms/iconButtons/AddButton';
import useAppNavigation from 'hooks/useAppNavigation';
import { cls } from 'utils/cls';

const TogetherChallenge = () => {
  const navigation = useAppNavigation();

  return (
    <div className={cls('relative h-full')}>
      <div className={cls('overflow-y-auto h-full')}>
        <div>나도 도전 화면</div>
      </div>
      <div className={cls('absolute bottom-3 right-0')}>
        <AddButton onClick={navigation.navigateToTogetherChallengeCreate} size={40} />
      </div>
    </div>
  );
};

export default TogetherChallenge;
