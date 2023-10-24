import { orange400 } from 'constants/color';

const SuccessChallenge = ({ title }: { title: string }) => {
  return <div style={cardStyle}>{title}</div>;
};

/* style */
const cardStyle = {
  borderColor: orange400,
  border: `2px solid ${orange400}`,
  borderRadius: '0.6rem',
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default SuccessChallenge;
