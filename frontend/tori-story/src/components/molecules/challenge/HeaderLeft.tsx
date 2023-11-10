import ChallengeCategory from 'components/atoms/challenge/ChallengeCategory';
import { cls } from 'utils/cls';

interface HeaderProps {
  challengeCategory: string;
  certificationCategory?: React.ReactElement;
}

const HeaderLeft = ({ challengeCategory, certificationCategory }: HeaderProps) => {
  return (
    <div className={cls('flex justify-start items-center')}>
      <ChallengeCategory title={challengeCategory} />
      {certificationCategory && <>{certificationCategory}</>}
    </div>
  );
};

export default HeaderLeft;
