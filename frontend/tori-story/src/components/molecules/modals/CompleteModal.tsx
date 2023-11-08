import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface CompleteModalProps {
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const CompleteModal = ({ openModal, setIsModalOpen }: CompleteModalProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleNavigatePhoto = () => {
    handleClose();
    alert('사진찍기 페이지 이동');
  };

  return (
    <Dialog fullWidth open={openModal} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <DialogContentText>완료되었습니다.</DialogContentText>
        <DialogContentText>사진을 공유하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' onClick={handleClose} color='primary'>
          닫기
        </Button>
        <Button variant='contained' onClick={handleNavigatePhoto} color='primary'>
          사진찍기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompleteModal;
