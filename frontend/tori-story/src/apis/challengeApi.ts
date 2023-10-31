import axios from 'apis';
import { customChallengeCreateProps, customChallengeScrapProps } from 'types/challenge';

const apiUrl = '/challenge';

interface MyCustomChallengeResponse {
  compFlag: boolean;
  content: string;
  endDt: string;
  id: number;
  imgUrl: string;
  startDt: string;
}
interface GetMyCustomChallengeResponse extends Response {
  data: MyCustomChallengeResponse[];
}
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

// 오늘 도전 중인 자유 과제 조회
export const readInProgressCustomChallengeApi = async () => {
  const res = await axios.get(`${apiUrl}/custom/my`);
  return res;
};

// 자유 도전 과제 삭제
export const deleteCustomChallengeApi = async (customEntryId: number) => {
  const res = await axios.delete(`${apiUrl}/custom/${customEntryId}`);
  return res;
};

// 자유 도전 과제 달성
export const patchCustomChallengeApi = async (customEntryId: number) => {
  const res = await axios.patch(`${apiUrl}/comp/${customEntryId}`);
  return res;
};

// 랜덤 도전과제 가져오기
export const readRandomChallengeApi = async () => {
  const res = await axios.get(`${apiUrl}/random`);
  console.log('random', res);

  return res;
};

// 랜덤 도전과제 갱신
export const patchRandomChallengeApi = async () => {
  const res = await axios.patch(`${apiUrl}/renewal`);
  return res;
};

// 랜덤 도전과제 AI 인증
export const certificationAIRandomApi = async (props: FormData) => {
  const res = await axios.post(`${apiUrl}/cert/random/ai`, props, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

// 내 랜덤 도전과제 달성
export const patchCompRandomChallengeApi = async () => {
  const res = await axios.patch(`${apiUrl}/comp`);
  return res;
};

export const getMyCustomChallengeAPI = async () => {
  const url = apiUrl + '/custom';
  const res = await axios.get<GetMyCustomChallengeResponse>(url);
  return res.data;
};
