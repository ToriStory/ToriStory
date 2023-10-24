import { Button } from '@mui/material';
// import useAppNavigation from 'hooks/useAppNavigation';
// import { CATEGORY } from 'constants/certificationCategory';

interface CardButtonProps {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardButton = ({ title, onClick }: CardButtonProps) => {
  // const navigation = useAppNavigation();

  // const handleOnClick = () => {
  //   if (category === CATEGORY.photo) {
  //     navigation.navigateToCertificationPhoto();
  //   } else if (category === CATEGORY.gps) {
  //     navigation.navigateToCertificationGPS();
  //   } else {
  //     navigation.navigateToMemory();
  //   }
  // };

  return (
    <Button
      variant='contained'
      sx={{ boxShadow: 'none' }}
      size='medium'
      style={{ marginLeft: 'auto' }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CardButton;
