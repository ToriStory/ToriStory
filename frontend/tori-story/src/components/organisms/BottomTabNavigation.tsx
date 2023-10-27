import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Trophy, Gift, Squirrel, HeartHandshake, User2 } from 'lucide-react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import useAppNavigation from 'hooks/useAppNavigation';
import {
  myChallengePage,
  myPagePage,
  myToriPage,
  togetherChallengePage,
  totoriPage,
} from 'constants/pathname';

function BottomTabNavigation({ pathname }: { pathname: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const navigation = useAppNavigation();

  useEffect(() => {
    if (pathname === totoriPage.label) {
      setValue(0);
    } else if (pathname === togetherChallengePage.label) {
      setValue(1);
    } else if (pathname === myChallengePage.label) {
      setValue(2);
    } else if (pathname === myToriPage.label) {
      setValue(3);
    } else if (pathname === myPagePage.label) {
      setValue(4);
    }
  }, [pathname]);
  useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  const bottomTabMenu = [
    {
      label: '토토리',
      icon: <Gift />,
      to: navigation.navigateToTotori,
    },
    {
      label: '나도 도전',
      icon: <HeartHandshake />,
      to: navigation.navigateToTogetherChallenge,
    },
    {
      label: '나의 도전',
      icon: <Trophy />,
      to: navigation.navigateToMyChallenge,
    },
    {
      label: '나의 토리',
      icon: <Squirrel />,
      to: navigation.navigateToMyTori,
    },
    {
      label: '나의 추억',
      icon: <User2 />,
      to: navigation.navigateToMyPage,
    },
  ];

  return (
    <div>
      <Box sx={{ pb: 7 }} ref={ref}>
        {pathname === '랜딩' ||
        pathname === '로그인' ||
        pathname === '회원가입' ||
        pathname === '설정' ||
        pathname === '알림' ||
        pathname === '도전 생성' ||
        pathname === '사진 인증' ||
        pathname === 'GPS 인증' ||
        pathname === '추억 남기기' ? (
          <div></div>
        ) : (
          <>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => {
                  setValue(newValue);
                }}
              >
                {bottomTabMenu.map((v, idx) => {
                  return (
                    <BottomNavigationAction
                      key={idx}
                      label={v.label}
                      icon={v.icon}
                      sx={{ minWidth: 'auto', whiteSpace: 'nowrap' }}
                      onClick={v.to}
                    />
                  );
                })}
              </BottomNavigation>
            </Paper>
          </>
        )}
      </Box>
    </div>
  );
}

export default BottomTabNavigation;
