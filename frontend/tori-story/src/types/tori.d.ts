export interface ToriCollectionItemProps {
  id: number;
  toriName: string;
  price: number;
  imgUrl: string;
  limitedFlag: boolean;
  collectionFlag: boolean;
}

export interface LetterItemProps {
  letter: string;
  gift: string;
  giftCnt: number;
}
