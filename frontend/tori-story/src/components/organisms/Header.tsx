import HeaderDepthMore from 'components/molecules/HeaderDepthMore';
import HeaderDepthOne from './../molecules/HeaderDepthOne';

function Header({ pathname }: { pathname: string }) {
  return (
    <>
      {pathname === '랜딩' || pathname === '로그인' || pathname === '회원가입' ? (
        <></>
      ) : pathname === '도전 생성' || pathname === '알림' || pathname === '설정' ? (
        <HeaderDepthMore pathname={pathname} />
      ) : (
        <HeaderDepthOne pathname={pathname} />
      )}
    </>
  );
}

export default Header;
