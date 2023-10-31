import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createCustomChallengeApi, createOtherCustomChallengeApi } from 'apis/challengeApi';
import useAppNavigation from 'hooks/useAppNavigation';
import { useAtom, useAtomValue } from 'jotai';
import { ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createChallengeDate,
  createChallengeDisplayFlag,
  createChallengeTitle,
} from 'stores/challengeStore';
import { CustomChallengeCreateProps, CustomChallengeScrapProps } from 'types/challenge';

export default function HeaderDepthMore({ pathname }: { pathname: string }) {
  const navigate = useNavigate();
  const navigation = useAppNavigation();

  const { content, id } = useLocation().state || { content: '', id: -1 };

  const [challengeTitle, setChallengeTitle] = useAtom(createChallengeTitle);
  const challengeDate = useAtomValue(createChallengeDate);
  const [challengeisplayFlag, setChallengeisplayFlag] = useAtom(createChallengeDisplayFlag);

  const handleGoBack = () => {
    navigate(-1);
    if (pathname === '도전 생성') {
      setChallengeTitle('');
      setChallengeisplayFlag(true);
    }
  };

  const handleCreateChallenge = async () => {
    if (challengeTitle !== '') {
      let result;
      if (content === '') {
        const createChallengeResponse: CustomChallengeCreateProps = {
          content: challengeTitle,
          endDt: challengeDate,
          displayFlag: challengeisplayFlag,
        };
        result = await toast.promise(createCustomChallengeApi(createChallengeResponse), {
          pending: '나도 도전 생성 중입니다',
          success: '나도 도전을 생성했습니다!',
          error: '나도 도전 생성에 실패했습니다',
        });
      } else {
        if (id !== -1) {
          const customChallengeId = parseInt(id);
          const updateChallengeResponse: CustomChallengeScrapProps = {
            endDt: challengeDate,
          };
          result = await toast.promise(
            createOtherCustomChallengeApi(customChallengeId, updateChallengeResponse),
            {
              pending: '도전을 스크랩 중입니다',
              success: '도전을 스크랩 했습니다!',
              error: '도전 스크랩에 실패했습니다',
            }
          );
        }
      }
      if (result?.data.code === 201) {
        navigation.navigateToMyChallenge();
        setChallengeTitle('');
        setChallengeisplayFlag(true);
      }
    }
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
              className='flex gap-4 justify-center items-center font-jua text-orange-400'
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
