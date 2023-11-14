import { Dialog, DialogContent } from '@mui/material';
import { X } from 'lucide-react';
import { cls } from 'utils/cls';

interface ImgDialogProps {
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  child: React.ReactNode;
}

const ImgDialog = ({ child, openModal, setIsModalOpen }: ImgDialogProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog fullWidth open={openModal} onClose={handleClose}>
      <div className={cls('flex justify-end mr-4 mt-4 text-orange-800')}>
        <X fontSize={30} strokeWidth={6} onClick={handleClose} />
      </div>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>{child}</DialogContent>
    </Dialog>
  );
};

export default ImgDialog;
