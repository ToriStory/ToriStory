import { Button } from '@mui/material';

interface ChoiceButtonsProps {
  cancelButtonLabel: string;
  cancelButtonAction: () => void;
  okayButtonLabel: string;
  okayButtonAction: () => void;
}

const ChoiceButtons = ({
  cancelButtonLabel,
  cancelButtonAction,
  okayButtonLabel,
  okayButtonAction,
}: ChoiceButtonsProps) => {
  return (
    <div className='flex gap-4'>
      <Button
        variant='contained'
        fullWidth
        className='w-full text-white font-bold text-lg flex-1'
        onClick={cancelButtonAction}
      >
        {cancelButtonLabel}
      </Button>
      <Button
        variant='contained'
        fullWidth
        className='w-full text-white font-bold text-lg flex-1'
        onClick={okayButtonAction}
      >
        {okayButtonLabel}
      </Button>
    </div>
  );
};

export default ChoiceButtons;
