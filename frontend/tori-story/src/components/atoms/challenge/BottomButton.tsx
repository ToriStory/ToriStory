import { Button } from '@mui/material';
// import useAppNavigation from 'hooks/useAppNavigation';
// import { CATEGORY } from 'constants/certificationCategory';

interface CardButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardButton = ({ title, onClick }: CardButtonProps) => {
  return (
    <Button
      variant='contained'
      sx={{ boxShadow: 'none', borderRadius: '0.6rem' }}
      size='medium'
      style={{ marginLeft: 'auto' }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CardButton;
