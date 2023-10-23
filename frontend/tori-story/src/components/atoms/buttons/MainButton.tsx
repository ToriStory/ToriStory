import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps, PropsWithChildren } from 'react';
import { cls } from 'utils/cls';

type buttonType = 'orange';

const buttonStyle: { [key in buttonType]: CSSProperties } = {
  orange: {
    background: '#FF762E',
    color: 'white',
  },
};

interface MainButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  styleType: buttonType;
  forGrid?: boolean;
  small?: boolean;
  className?: string;
}
export const MainButton = (props: PropsWithChildren<MainButtonProps>) => {
  const { styleType, forGrid = false, small = false, className = '', ...etc } = props;
  return (
    <button
      className={cls(
        'rounded-lg font-semibold text-xl',
        forGrid ? 'w-full h-full px-2 py-1' : small ? 'px-4 h-8' : 'w-36 h-12',
        className
      )}
      style={{ ...buttonStyle[styleType], wordBreak: 'keep-all' }}
      {...etc}
    />
  );
};

export default MainButton;
