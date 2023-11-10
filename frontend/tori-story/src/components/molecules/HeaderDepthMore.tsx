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
import { updateToast } from 'utils/toast';

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
        result = await createCustomChallengeApi(createChallengeResponse);
        if (result.data.code === 201) {
          navigation.navigateToMyChallenge();
        } else {
          const createChallengeToastId = toast.loading('나도 도전 생성 중입니다');
          updateToast(createChallengeToastId, '나도 도전 생성에 실패했습니다', 'error', false, () =>
            navigation.navigateToMyChallenge()
          );
        }
      } else {
        if (id !== -1) {
          const customChallengeId = parseInt(id);
          const updateChallengeResponse: CustomChallengeScrapProps = {
            endDt: challengeDate,
          };
          result = await createOtherCustomChallengeApi(customChallengeId, updateChallengeResponse);
          if (result.data.code === 201) {
            navigation.navigateToMyChallenge();
          } else {
            const scrapChallengeToastId = toast.loading('도전을 스크랩 중입니다');
            updateToast(scrapChallengeToastId, '도전 스크랩에 실패했습니다', 'error', false, () =>
              navigation.navigateToMyChallenge()
            );
          }
        }
      }
      if (result?.data.code === 201) {
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
            {id !== -1 ? '나도 도전' : pathname}
          </Typography>
          {pathname === '도전 생성' && (
            <div
              className='flex gap-4 justify-center items-center font-jua text-orange-400'
              onClick={handleCreateChallenge}
            >
              저장
            </div>
          )}
          {pathname === '감사일기 쓰기' && (
            <button
              className='flex gap-4 justify-center items-center font-jua text-orange-400'
              type='submit'
              form='thankNoteForm'
            >
              저장
            </button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
