import { orange100, orange400, orange600 } from 'constants/color';

const ChallengeCategory = ({ title }: { title: string }) => {
  return <div style={divStyle}>{title}</div>;
};

const divStyle = {
  borderRadius: '0.6rem',
  backgroundColor: orange100,
  padding: '0px 16px',
  margin: '0px 8px 0px 0px',
  color: orange600,
};

export default ChallengeCategory;
