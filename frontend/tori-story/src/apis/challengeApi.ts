import axios from 'apis';
import { customChallengeCreateProps, customChallengeScrapProps } from 'types/challenge';

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
