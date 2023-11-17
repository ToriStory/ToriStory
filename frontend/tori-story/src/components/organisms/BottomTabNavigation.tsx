import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Trophy, Squirrel, HeartHandshake, User2, PenSquare } from 'lucide-react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import useAppNavigation from 'hooks/useAppNavigation';
import {
  myChallengePage,
  myPagePage,
  myToriPage,
  thankNotePage,
  togetherChallengePage,
} from 'constants/pathname';
import { useNavigate } from 'react-router-dom';

function BottomTabNavigation({ pathname }: { pathname: string }) {
  const [value, setValue] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const navigation = useAppNavigation();

  useEffect(() => {
    if (pathname === thankNotePage.label) {
      setValue(0);
    } else if (pathname === togetherChallengePage.label) {
      setValue(1);
    } else if (pathname === myToriPage.label) {
      setValue(2);
    } else if (pathname === myChallengePage.label) {
      setValue(3);
    } else if (pathname === myPagePage.label) {
      setValue(4);
    } else {
      setValue(-1);
    }
  }, [pathname]);
  useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  const bottomTabMenu = [
    {
      label: thankNotePage.label,
      icon: <PenSquare />,
      to: () => navigate(thankNotePage.path),
    },
    {
      label: togetherChallengePage.label,
      icon: <HeartHandshake />,
      to: navigation.navigateToTogetherChallenge,
    },
    {
      label: myToriPage.label,
      icon: <Squirrel />,
      to: navigation.navigateToMyTori,
    },
    {
      label: myChallengePage.label,
      icon: <Trophy />,
      to: navigation.navigateToMyChallenge,
    },
    {
      label: myPagePage.label,
      icon: <User2 />,
      to: navigation.navigateToMyPage,
    },
  ];

  return (
    <div>
      <Box sx={{ pb: 7 }} ref={ref}>
        {pathname === '마이 토리' ||
        pathname === '마이페이지' ||
        pathname === '감사일기' ||
        pathname === '함께 도전' ||
        pathname === '나의 도전' ||
        pathname === '회원가입' ||
        pathname === '로그인' ? (
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
        ) : (
          <div></div>
        )}
      </Box>
    </div>
  );
}

export default BottomTabNavigation;
