import { getToriCollection } from 'apis/toriApi';
import { ToriCollectionItem } from 'components/atoms/collection/ToriCollectionItem';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ToriCollectionItemProps } from 'types/tori';

export const ToriCollectionList = ({
  setIsCollectionListModalOpen,
}: {
  setIsCollectionListModalOpen: (isOpen: boolean) => void;
}) => {
  const [toriCollectionList, setToriCollectionList] = useState<ToriCollectionItemProps[]>([]); // 초기 상태의 타입 명시
  const [, setMyToriCollection] = useState<number>();

  const toriCollectionListResult = useSWR('toriCollectionList', () => getToriCollection());

  useEffect(() => {
    if (toriCollectionListResult?.data?.data) {
      setToriCollectionList(toriCollectionListResult.data.data.collectionResList);
      setMyToriCollection(toriCollectionListResult.data.data.profile);
    }
  }, [toriCollectionListResult]);

  return (
    <div className='grid grid-cols-2 gap-4 '>
      {toriCollectionList.map((item, index) => (
        <div key={index}>
          <ToriCollectionItem
            toriCollection={item}
            setIsCollectionListModalOpen={setIsCollectionListModalOpen}
          />
        </div>
      ))}
    </div>
  );
};
