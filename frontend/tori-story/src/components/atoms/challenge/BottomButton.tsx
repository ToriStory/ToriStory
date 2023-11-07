import { Button } from '@mui/material';

interface BottomButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BottomButton = ({ title, onClick }: BottomButtonProps) => {
  return (
    <Button
      variant='contained'
      sx={{ boxShadow: 'none', borderRadius: '0.6rem' }}
      size='medium'
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default BottomButton;
