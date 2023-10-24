import { orange200 } from 'constants/color';

const ChallengeCategory = ({ title }: { title: string }) => {
  return <div style={divStyle}>{title}</div>;
};

const divStyle = {
  borderRadius: '0.6rem',
  backgroundColor: orange200,
  padding: '8px 16px',
};

export default ChallengeCategory;
