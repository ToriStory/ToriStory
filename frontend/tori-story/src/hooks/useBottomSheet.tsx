import { useState } from 'react';
import Sheet from 'react-modal-sheet';
import { cls } from 'utils/cls';

export const useBottomSheet = () => {
  const [title, setTitle] = useState<JSX.Element | null>(null);
  const [Target, setTarget] = useState<JSX.Element | null>(null);
  const openPopup = (target: JSX.Element, title?: JSX.Element) => {
    setTarget(target), title && setTitle(title);
  };
  const closePopup = (callback?: () => void) => {
    if (callback) callback();
    setTarget(null);
    setTitle(null);
  };
  const isOpen = Target ? true : false;
  const component = (
    <div>
      <div
        className={cls(
          'fixed w-screen h-screen left-0 top-0 z-[1200] flex justify-center items-center',
          Target ? '' : 'hidden'
        )}
        onClick={() => closePopup()}
      />
      <Sheet detent='content-height' isOpen={isOpen} onClose={closePopup}>
        <Sheet.Container>
          <Sheet.Header>{title}</Sheet.Header>
          <Sheet.Content>
            <Sheet.Scroller>{Target}</Sheet.Scroller>
          </Sheet.Content>
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
