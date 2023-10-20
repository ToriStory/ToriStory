import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Bell, Settings } from 'lucide-react';
import useAppNavigation from 'hooks/useAppNavigation';

export default function HeaderDepthOne({ pathname }: { pathname: string }) {
  const navigation = useAppNavigation();

  const navItems = [
    {
      name: '알림',
      to: navigation.navigateToNotification,
      icon: <Bell />,
    },
    {
      name: '설정',
      to: navigation.navigateToSetting,
      icon: <Settings />,
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav'>
        <Toolbar sx={{ color: 'white' }} style={{ minHeight: 56 }}>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: 'block', textAlign: 'justify' }}
          >
            {pathname}
          </Typography>
          <div className='flex gap-4 justify-center items-center'>
            {navItems.map((item) => (
              <button key={item.name} className=' text-white' onClick={item.to}>
                {item.icon}
              </button>
            ))}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
