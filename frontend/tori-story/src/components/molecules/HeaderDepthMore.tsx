import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ChevronLeft } from 'lucide-react';
import useAppNavigation from 'hooks/useAppNavigation';
import { useNavigate } from 'react-router-dom';

export default function HeaderDepthMore({ pathname }: { pathname: string }) {
  const navigation = useAppNavigation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav' sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar sx={{ color: ' black' }} style={{ minHeight: 56 }}>
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
          {pathname === '도전 생성' && (
            <div className='flex gap-4 justify-center items-center'>저장</div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
