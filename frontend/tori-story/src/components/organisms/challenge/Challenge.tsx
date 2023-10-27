import { orange400 } from 'constants/color';
import React from 'react';

interface ChallengeProps {
  headerLeft: React.ReactElement;
  headerRight?: React.ReactElement;
  bottomLeft?: React.ReactElement;
  bottomRight: React.ReactElement;
  content: string;
}

const Challenge = ({
  headerLeft,
  headerRight = <div></div>,
  bottomLeft = <div></div>,
  bottomRight,
  content,
}: ChallengeProps) => {
  return (
    <div style={cardStyle}>
      <div style={cardHeaderBottomStyle}>
        {headerLeft}
        {headerRight}
      </div>
      <div style={cardContentStyle}>{content}</div>
      <div style={cardHeaderBottomStyle}>
        {bottomLeft}
        {bottomRight}
      </div>
    </div>
  );
};

/* style */
const cardStyle = {
  backgroundColor: 'white',
  display: 'relative',
  opacity: 0.95,
  borderColor: orange400,
  border: `2px solid ${orange400}`,
  borderRadius: '0.6rem',
  padding: '8px 16px ',
  marginBottom: '1rem',
};

const cardHeaderBottomStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const cardContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.4rem',
  margin: '8px 0px',
};

export default Challenge;
