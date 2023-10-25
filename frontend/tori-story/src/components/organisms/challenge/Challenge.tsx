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
  borderColor: orange400,
  border: `2px solid ${orange400}`,
  borderRadius: '0.6rem',
  padding: '16px',
  marginTop: '1rem',
};

const cardHeaderBottomStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const cardContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '16px 0px',
};

export default Challenge;
