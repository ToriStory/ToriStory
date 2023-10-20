import HeaderDepthOne from './../molecules/HeaderDepthOne';

function Header({ pathname }: { pathname: string }) {
  return (
    <>
      <HeaderDepthOne pathname={pathname} />
    </>
  );
}

export default Header;
