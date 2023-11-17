import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface OnceDialogProps {
  content: string | React.ReactNode;
  buttonTitle: string;
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleOnClick?: () => void;
}

const OnceDialog = ({
  content,
  buttonTitle,
  openModal,
  setIsModalOpen,
  handleOnClick,
}: OnceDialogProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
    if (handleOnClick) {
      handleOnClick();
    }
  };

  return (
    <Dialog fullWidth open={openModal} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {typeof content === 'string' ? <DialogContentText>{content}</DialogContentText> : content}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          {buttonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OnceDialog;
