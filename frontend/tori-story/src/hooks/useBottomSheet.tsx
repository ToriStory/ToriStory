import { useState } from 'react';
import Sheet from 'react-modal-sheet';

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
    <Sheet detent='content-height' isOpen={isOpen} onClose={closePopup}>
      <Sheet.Container>
        <Sheet.Header>{title}</Sheet.Header>
        <Sheet.Content>
          <Sheet.Scroller>{Target}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
  return {
    component,
    openPopup,
    closePopup,
    isOpen,
  };
};

export default useBottomSheet;
