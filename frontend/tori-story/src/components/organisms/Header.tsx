import HeaderDepthMore from 'components/molecules/HeaderDepthMore';
import HeaderDepthOne from './../molecules/HeaderDepthOne';

function Header({ pathname }: { pathname: string }) {
  return (
    <>
      {pathname === '랜딩' ? (
        <></>
      ) : pathname === '마이 토리' ||
        pathname === '마이페이지' ||
        pathname === '토토리' ||
        pathname === '함께 도전' ||
        pathname === '나의 도전' ||
        pathname === '회원가입' ||
        pathname === '로그인' ? (
        <HeaderDepthOne pathname={pathname} />
      ) : (
        <HeaderDepthMore pathname={pathname} />
      )}
    </>
  );
}

export default Header;
