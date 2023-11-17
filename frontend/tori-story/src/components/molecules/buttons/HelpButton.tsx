import { Dialog, DialogContent } from '@mui/material';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';

const HelpButton = ({ content }: { content: React.ReactNode }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <HelpCircle size={16} onClick={handleOpen} />
      <Dialog fullWidth open={openModal} onClose={handleClose}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>{content}</DialogContent>
      </Dialog>
    </>
  );
};

export default HelpButton;
