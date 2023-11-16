import { Modal } from '@mui/material';
import { ToriCollectionDetail } from 'components/molecules/collections/ToriCollectionDetail';
import { useState } from 'react';
import { ToriCollectionItemProps } from 'types/tori';
import { cls } from 'utils/cls';

export const ToriCollectionItem = ({
  toriCollection,
  setIsCollectionListModalOpen,
}: // myToriCollection,
{
  toriCollection: ToriCollectionItemProps;
  setIsCollectionListModalOpen: (isOpen: boolean) => void;
  // myToriCollection: number | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className={cls(
          `w-full rounded-lg  ${
            toriCollection.collectionFlag
              ? ' bg-[#fde7aa] bg-opacity-70 '
              : 'bg-[#fef1cb] opacity-30'
          }`
        )}
        onClick={handleOpen}
      >
        <div className='relative w-full' style={{ paddingTop: '100%' }}>
          <img
            src={toriCollection.imgUrl}
            alt={toriCollection.toriName}
            className={'absolute inset-0 p-4 w-full h-full object-contain'}
          />
        </div>
      </div>
      <Modal open={open} onClose={handleClose} style={{ zIndex: 10000 }}>
        <div
          className={cls(
            'absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-10/12 bg-white p-4 rounded-lg'
          )}
        >
          <ToriCollectionDetail
            handleClose={handleClose}
            toriCollection={toriCollection}
            setIsCollectionListModalOpen={setIsCollectionListModalOpen}
          />
        </div>
      </Modal>
    </>
  );
};
