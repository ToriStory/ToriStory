import { atom } from 'jotai';
import DefaultSquirrel from 'assets/images/DefaultSquirrel.png';

export const dotoriCntAtom = atom<number>(0);
export const profileToriImgUrlAtom = atom<string>(DefaultSquirrel);
