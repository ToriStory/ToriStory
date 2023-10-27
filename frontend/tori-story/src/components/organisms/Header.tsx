import HeaderDepthMore from 'components/molecules/HeaderDepthMore';
import HeaderDepthOne from './../molecules/HeaderDepthOne';

function Header({ pathname }: { pathname: string }) {
  return (
    <>
      {pathname === '랜딩' ? (
        <></>
      ) : pathname === '도전 생성' ||
        pathname === '알림' ||
        pathname === '설정' ||
        pathname === '사진 인증' ||
        pathname === 'GPS 인증' ||
        pathname === '추억 남기기' ? (
        <HeaderDepthMore pathname={pathname} />
      ) : (
        <HeaderDepthOne pathname={pathname} />
      )}
    </>
  );
}

export default Header;
