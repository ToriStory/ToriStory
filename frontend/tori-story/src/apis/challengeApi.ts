import axios from 'apis';
import {
  CustomChallengeCreateProps,
  CustomChallengeScrapProps,
  ReportCustomChallenge,
} from 'types/challenge';

const apiUrl = '/challenge/';

interface ChallengeCalendarProps {
  date: string;
}

interface MyChallengeMonthResponse extends Response {
  data: string[];
}

export interface ChallengeDailyResponse {
  id: number;
  content: string;
  startDt: string;
  endDt: string;
  compFlag: boolean;
  imgUrl: string;
}

export interface MyChallengeDailyResponse extends Response {
  data: ChallengeDailyResponse[];
}

// 자유 도전 과제 생성
export const createCustomChallengeApi = async (props: CustomChallengeCreateProps) => {
  const url = apiUrl + `custom`;
  const res = await axios.post(url, props);
  return res;
};

// 자유 도전 과제 가져오기.
export const createOtherCustomChallengeApi = async (
  customChallengeId: number,
  customChallenge: CustomChallengeScrapProps
) => {
  const url = apiUrl + `scrap/${customChallengeId}`;
  const res = await axios.post(url, customChallenge);
  return res;
};

// 오늘 도전 중인 자유 과제 조회
export const readInProgressCustomChallengeApi = async () => {
  const url = apiUrl + `custom/my`;
  const res = await axios.get(url);
  return res;
};

// 자유 도전 과제 삭제
export const deleteCustomChallengeApi = async (customEntryId: number) => {
  const url = apiUrl + `custom/${customEntryId}`;
  const res = await axios.delete(url);
  return res;
};

// 자유 도전 과제 달성
export const patchCustomChallengeApi = async (customEntryId: number) => {
  const url = apiUrl + `comp/${customEntryId}`;
  const res = await axios.patch(url);
  return res;
};

// 달성 과제 이미지 등록
export const patchCustomChallengeMemoryAPI = async (customEntryId: number, props: FormData) => {
  const url = apiUrl + `memory/${customEntryId}`;
  const res = await axios.patch(url, props, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

// 랜덤 도전과제 가져오기
export const readRandomChallengeApi = async () => {
  const url = apiUrl + `random`;
  const res = await axios.get(url);
  return res;
};

// 랜덤 도전과제 갱신
export const patchRandomChallengeApi = async () => {
  const url = apiUrl + `renewal`;
  const res = await axios.patch(url);
  return res;
};

// 랜덤 도전과제 AI 인증
export const certificationAIRandomApi = async (props: FormData) => {
  const url = apiUrl + `cert/random/ai`;
  const res = await axios.post(url, props, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

// 내 랜덤 도전과제 달성
export const patchCompRandomChallengeApi = async () => {
  const url = apiUrl + `comp`;
  const res = await axios.patch(url);
  return res;
};

export const getMyChallengeMonthAPI = async (data: ChallengeCalendarProps) => {
  const url = apiUrl + `custom`;
  const res = await axios.get<MyChallengeMonthResponse>(url, { params: data });
  return res;
};

export const getMyChallengeDailyAPI = async (data: ChallengeCalendarProps) => {
  const url = apiUrl + `custom/detail`;
  const res = await axios.get<MyChallengeDailyResponse>(url, { params: data });
  return res;
};

// 신고하기
export const reportCustomChallengeAPI = async (data: ReportCustomChallenge) => {
  const url = apiUrl + `report`;
  const res = await axios.post(url, data);
  return res;
};

// 공동 도전 과제 조회
export const getCommonChallengeAPI = async () => {
  const url = apiUrl + `common`;
  const res = await axios.get(url);
  return res;
};

// 공동 도전 과제 상세 조회
export const getCommonChallengeDetailAPI = async (commonChallengeId: number) => {
  const url = apiUrl + `common/${commonChallengeId}`;
  const res = await axios.get(url);
  return res;
};

// 공동 도전 과제 참여
export const postCommonChallengeAttendAPI = async () => {
  const url = apiUrl + `common/attend`;
  const res = await axios.post(url);
  return res;
};

// 공동 도전 과제 달성
export const patchCommonChallengeCompleteAPI = async (commonChallengeId: number) => {
  const url = apiUrl + `common/comp/${commonChallengeId}`;
  const res = await axios.patch(url);
  return res;
};

// 공동 도전 과제 이미지 등록
export const patchCommonChallengeReviewAPI = async (commonChallengeId: number, props: FormData) => {
  const url = apiUrl + `common/review/${commonChallengeId}`;
  const res = await axios.patch(url, props, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

// 사용자의 퀘스트 조회
export const getQuestApi = async () => {
  const url = apiUrl + 'quest';
  const res = await axios.get(url);
  return res;
};

// 수령할 보상이 있는지 확인
export const isReceivedReward = async () => {
  const url = apiUrl + 'quest/rewards';
  const res = await axios.get(url);
  return res;
};

// 달성 퀘스트 보상 받기
export const getReward = async (questNo: number) => {
  const url = apiUrl + `quest/rewards/${questNo}`;
  const res = await axios.post(url);
  return res;
};
