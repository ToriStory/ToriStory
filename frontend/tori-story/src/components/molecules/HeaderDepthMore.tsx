import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAtom, useAtomValue } from 'jotai';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  createChallengeDate,
  createChallengeDisplayFlag,
  createChallengeTitle,
} from 'stores/challengeStore';
import { customChallengeCreateProps } from 'types/challenge';

export default function HeaderDepthMore({ pathname }: { pathname: string }) {
  const navigate = useNavigate();

  const [challengeTitle, setChallengeTitle] = useAtom(createChallengeTitle);
  const challengeDate = useAtomValue(createChallengeDate);
  const [challengeisplayFlag, setChallengeisplayFlag] = useAtom(createChallengeDisplayFlag);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateChallenge = () => {
    const createChallengeResponse: customChallengeCreateProps = {
      content: challengeTitle,
      endDt: challengeDate,
      displayFlag: challengeisplayFlag,
    };
    console.log(createChallengeResponse);

    navigate(-1);
    setChallengeTitle('');
    setChallengeisplayFlag(true);
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
            <div
              className='flex gap-4 justify-center items-center font-jua'
              onClick={handleCreateChallenge}
            >
              저장
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
