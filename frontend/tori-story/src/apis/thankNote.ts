/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'apis';
import { Response } from 'types';

const thankNoteUrl = '/thank/';

export interface AddThankNoteProps {
  thankNotes: string;
}

interface NullishResponse extends Response {
  data: null;
}

interface ThankNoteStatisticsResponse extends Response {
  data: {
    totalCnt: number;
    continueCnt: number;
  };
}

interface ThankNoteDaily {
  content: string | null;
}

interface ThankNoteCalendarProps {
  date: string;
}

interface ThankNoteMonthlyResponse extends Response {
  data: string[];
}

interface ThankNoteDailyResponse extends Response {
  data: ThankNoteDaily;
}

export const getThankNoteStatisticsAPI = async () => {
  const url = thankNoteUrl;
  const res = await axios.get<ThankNoteStatisticsResponse>(url);
  return res;
};

export const getMonthlyThankNoteAPI = async (data: ThankNoteCalendarProps) => {
  const url = thankNoteUrl + `monthly`;
  const res = await axios.get<ThankNoteMonthlyResponse>(url, { params: data });
  return res;
};

export const getDailyThankNoteAPI = async (data: ThankNoteCalendarProps) => {
  const url = thankNoteUrl + `daily`;
  const res = await axios.get<ThankNoteDailyResponse>(url, { params: data });
  return res;
};

export const addThankNoteAPI = async (data: AddThankNoteProps) => {
  const url = thankNoteUrl;
  const res = await axios.post<NullishResponse>(url, data);
  return res;
};
