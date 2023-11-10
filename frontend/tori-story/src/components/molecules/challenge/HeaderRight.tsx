import { cls } from 'utils/cls';

interface HeaderProps {
  button?: React.ReactElement;
}

const HeaderRight = ({ button }: HeaderProps) => {
  return <div className={cls('flex justify-start items-center')}>{button && <>{button}</>}</div>;
};

export default HeaderRight;
