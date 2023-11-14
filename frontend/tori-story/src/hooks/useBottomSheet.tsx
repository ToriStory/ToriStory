import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { cls } from 'utils/cls';

export const useBottomSheet = () => {
  const [Target, setTarget] = useState<JSX.Element | null>(null);
  const openPopup = (target: JSX.Element) => setTarget(target);
  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    setTarget(null);
  };
  const isOpen = Target ? true : false;
  const component = (
    <div
      className={cls(
        'fixed w-screen h-screen bg-black bg-opacity-80 left-0 top-0 z-30 flex justify-center items-center',
        Target ? '' : 'hidden'
      )}
    >
      <Sheet isOpen={isOpen} onClose={closePopup}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content className='py-4'>{Target}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
  return {
    component,
    openPopup,
    closePopup,
    isOpen,
  };
};

export default useBottomSheet;
