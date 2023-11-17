import ChallengeCategory from 'components/atoms/challenge/ChallengeCategory';
import { cls } from 'utils/cls';

interface HeaderProps {
  challengeCategory: string;
  otherElement?: React.ReactElement;
}

const HeaderLeft = ({ challengeCategory, otherElement }: HeaderProps) => {
  return (
    <div className={cls('flex justify-start items-center gap-2')}>
      <ChallengeCategory title={challengeCategory} />
      {otherElement && <>{otherElement}</>}
    </div>
  );
};

export default HeaderLeft;
