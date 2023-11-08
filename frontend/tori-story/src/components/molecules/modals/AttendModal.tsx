import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface AttendModalProps {
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AttendModal = ({ openModal, setIsModalOpen }: AttendModalProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog fullWidth open={openModal} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <DialogContentText>참여가 완료되었습니다</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleClose} color='primary'>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendModal;
