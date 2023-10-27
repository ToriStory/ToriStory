import axios from 'apis';
import { customChallengeCreateProps } from 'types/challenge';

const apiUrl = '/challenge';

// 자유 도전 과제 생성
export const createCustomChallengeApi = async (props: customChallengeCreateProps) => {
  const res = await axios.post(`${apiUrl}/custom`, props);
  return res;
};
