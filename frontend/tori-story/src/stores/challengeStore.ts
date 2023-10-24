import { atom } from 'jotai';

export const createChallengeTitle = atom<string>('');
export const createChallengeDate = atom<string | null>(null);
export const createChallengeDisplayFlag = atom<boolean>(true);
