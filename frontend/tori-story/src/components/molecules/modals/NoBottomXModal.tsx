import { Dialog, DialogContent } from '@mui/material';
import { X } from 'lucide-react';
import { cls } from 'utils/cls';

interface NoButtonModalProps {
  child: React.ReactNode;
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const NoButtonModal = ({ child, openModal, setIsModalOpen }: NoButtonModalProps) => {
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

export default NoButtonModal;
