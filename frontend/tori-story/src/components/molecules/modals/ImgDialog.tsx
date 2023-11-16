import { Dialog, DialogContent } from '@mui/material';
import LabelSimple from 'components/atoms/challenge/LabelSimple';
import { X } from 'lucide-react';
import { cls } from 'utils/cls';

interface ImgDialogProps {
  title?: string;
  openModal: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const ImgDialog = ({ title, children, openModal, setIsModalOpen }: ImgDialogProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog fullWidth open={openModal} onClose={handleClose}>
      <DialogContent sx={{ padding: '0.8rem' }}>
        <div className={cls('relative p-2 flex flex-col bg-orange-50 rounded-sm')}>
          <div className={cls('relative flex mb-4 h-6 text-orange-800')}>
            {title && (
              <div className={cls('absolute inset-x-0 top-0 text-center')}>
                <LabelSimple title={title} />
              </div>
            )}
            <X
              className={cls('absolute right-0 top-0 text-center')}
              fontSize={30}
              strokeWidth={6}
              onClick={handleClose}
            />
          </div>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImgDialog;
