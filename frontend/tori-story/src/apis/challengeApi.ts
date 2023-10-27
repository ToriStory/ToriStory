import axios from 'apis';
import {
  customChallengeCreateProps,
  customChallengeScrapProps,
  CertificationResponse,
} from 'types/challenge';

const apiUrl = '/challenge';

// 자유 도전 과제 생성
export const createCustomChallengeApi = async (props: customChallengeCreateProps) => {
  const res = await axios.post(`${apiUrl}/custom`, props);
  return res;
};

// 자유 도전 과제 가져오기.
export const createOtherCustomChallengeApi = async (
  customChallengeId: number,
  customChallenge: customChallengeScrapProps
) => {
  const res = await axios.post(`${apiUrl}/scrap/${customChallengeId}`, customChallenge);
  return res;
};

// 랜덤 도전과제 AI 인증
export const certificationAIRandomApi = async (props: FormData) => {
  const res: CertificationResponse = await axios.post(`${apiUrl}/cert/random/ai`, props, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
