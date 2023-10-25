interface HeaderProps {
  button?: React.ReactElement;
}

const HeaderRight = ({ button }: HeaderProps) => {
  return <div style={divStyle}>{button && <>{button}</>}</div>;
};

/* style */
const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
};

export default HeaderRight;
