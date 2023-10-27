import ChallengeCategory from 'components/atoms/challenge/ChallengeCategory';

interface HeaderProps {
  challengeCategory: string;
  certificationCategory?: React.ReactElement;
}

const HeaderLeft = ({ challengeCategory, certificationCategory }: HeaderProps) => {
  return (
    <div style={divStyle}>
      <ChallengeCategory title={challengeCategory} />
      {certificationCategory && <>{certificationCategory}</>}
    </div>
  );
};

/* style */
const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
};

export default HeaderLeft;
