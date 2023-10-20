import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Trophy, Gift, Squirrel, HeartHandshake, User2 } from 'lucide-react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import useAppNavigation from 'hooks/useAppNavigation';

function BottomTabNavigation() {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const navigation = useAppNavigation();

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
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
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
    </Box>
  );
}

export default BottomTabNavigation;
