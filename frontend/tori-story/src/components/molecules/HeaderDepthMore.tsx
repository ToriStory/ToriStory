import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Bell, ChevronLeft, Settings } from 'lucide-react';
import useAppNavigation from 'hooks/useAppNavigation';
import { useNavigate } from 'react-router-dom';

export default function HeaderDepthMore({ pathname }: { pathname: string }) {
  const navigation = useAppNavigation();
  const navigate = useNavigate();
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
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav'>
        <Toolbar sx={{ color: 'white' }} style={{ minHeight: 56 }}>
          <IconButton
            color='inherit'
            edge='start'
            onClick={handleGoBack}
            sx={{ mr: 2, display: 'block' }}
          >
            <ChevronLeft />
          </IconButton>
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
