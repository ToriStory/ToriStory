import React from 'react';
import { cls } from 'utils/cls';

interface ChallengeProps {
  headerLeft: React.ReactElement;
  headerRight?: React.ReactElement;
  bottomLeft?: React.ReactElement;
  bottomRight?: React.ReactElement;
  content: string;
}

const Challenge = ({
  headerLeft,
  headerRight = <div></div>,
  bottomLeft = <div></div>,
  bottomRight = <div></div>,
  content,
}: ChallengeProps) => {
  return (
    <div
      className={cls(
        'relative mb-4 px-2 py-2 bg-white opacity-95 border-2 border-orange-400 rounded-xl '
      )}
    >
      <div className={cls('flex justify-between items-center min-h-[32px]')}>
        {headerLeft}
        {headerRight}
      </div>
      <div className={cls('flex justify-center items-center p-2 text-2xl')}>{content}</div>
      <div className={cls('flex justify-between items-center min-h-[32px]')}>
        {bottomLeft}
        {bottomRight}
      </div>
    </div>
  );
};

export default Challenge;
