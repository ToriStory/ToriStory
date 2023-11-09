import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface OnceModallProps {
  content: string;
  buttonTitle: string;
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleOnClick?: () => void;
}

const OnceModal = ({
  content,
  buttonTitle,
  openModal,
  setIsModalOpen,
  handleOnClick,
}: OnceModallProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
    if (handleOnClick) {
      handleOnClick();
    }
  };

  return (
    <Dialog fullWidth open={openModal} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          {buttonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OnceModal;
