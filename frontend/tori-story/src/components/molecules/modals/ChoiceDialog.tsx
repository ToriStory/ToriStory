import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { ReactNode } from 'react';

interface ChoiceDialogProps {
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  content: ReactNode;
  leftButtonTitle?: string;
  rigthButtonTitle: string;
  leftButtonOnClick?: () => void;
  rightButtonOnClick: () => void;
}

const ChoiceDialog = ({
  openModal,
  setIsModalOpen,
  content,
  leftButtonTitle = '닫기',
  leftButtonOnClick,
  rigthButtonTitle,
  rightButtonOnClick,
}: ChoiceDialogProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
    if (leftButtonOnClick) {
      leftButtonOnClick();
    }
  };

  const handleRightButton = () => {
    handleClose();
    rightButtonOnClick();
  };

  return (
    <Dialog fullWidth open={openModal} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>{content}</DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' onClick={handleClose} color='primary'>
          {leftButtonTitle}
        </Button>
        <Button variant='contained' onClick={handleRightButton} color='primary'>
          {rigthButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChoiceDialog;
