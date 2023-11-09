import { atom } from 'jotai';

export const createChallengeTitle = atom<string>('');
export const createChallengeDate = atom<string | null>(null);
export const createChallengeDisplayFlag = atom<boolean>(true);

// 공동 도전
export const attendFlagAtom = atom<boolean>(false);
export const compFlagAtom = atom<boolean>(false);
export const attendCntAtom = atom<number>(0);
export const compCntAtom = atom<number>(0);
export const unitAtom = atom<number[]>([]);
export const maxCntAtom = atom<number>(0);
