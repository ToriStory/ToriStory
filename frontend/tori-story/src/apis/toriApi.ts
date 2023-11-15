import axios from 'apis';
import { Response } from 'types';
import { LetterItemProps } from 'types/tori';

const apiUrl = '/tori/';

interface LetterResponse extends Response {
  data: LetterItemProps;
}

// 토리 도감 가져오기
export const getToriCollection = async () => {
  const url = apiUrl + 'collection';
  const res = await axios.get(url);
  return res.data;
};

// 다람쥐 입양
export const adoptSquirrel = async (toriId: number) => {
  const url = apiUrl + `collection/${toriId}`;
  const res = await axios.post(url);
  return res;
};

// 여우 밥주기
export const feedFox = async () => {
  const url = apiUrl + 'basket/feed';
  const res = await axios.post(url);
  return res;
};

// 바구니 확인
export const getBasket = async () => {
  const url = apiUrl + 'basket';
  const res = await axios.get(url);
  return res;
};

// 쪽지 조회
export const getLetter = async () => {
  const url = apiUrl + 'basket/letter';
  const res = await axios.get<LetterResponse>(url);
  return res.data;
};

// 도토리, 랜덤 티켓, 토토리 티켓 개수 조회
export const getToriAsset = async () => {
  const url = apiUrl + 'asset';
  const res = await axios.get(url);
  return res.data;
};
