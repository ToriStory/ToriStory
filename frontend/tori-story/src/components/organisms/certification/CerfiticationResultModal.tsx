import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { myChallengePage } from 'constants/pathname';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CertificationResultModalProps {
  result: boolean;
  handleNavigate: () => void;
  handleRetry?: () => void;
}

const CertificationResultModal = ({
  result,
  handleNavigate,
  handleRetry,
}: CertificationResultModalProps) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleModalNavigate = () => {
    setOpen(false);
    handleNavigate();
    navigate(myChallengePage.path, { replace: true });
  };

  const handleModalRetry = () => {
    setOpen(false);
    if (handleRetry) {
      handleRetry();
    }
  };

  useEffect(() => {
    console.log('모달 진입');
  }, []);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{result === true ? '인증 성공' : '인증 실패'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {result === true ? '인증에 성공하였습니다.' : '인증에 실패하였습니다.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {result === true ? (
          <>
            <div></div>
            <Button variant='contained' onClick={handleModalNavigate} color='primary'>
              확인
            </Button>
          </>
        ) : (
          <>
            <Button variant='contained' onClick={handleModalNavigate} color='primary'>
              인증취소
            </Button>
            <Button variant='contained' onClick={handleModalRetry} color='primary'>
              다시 시도
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CertificationResultModal;
