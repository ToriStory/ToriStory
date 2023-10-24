import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

export const TogetherChallengeCreate = () => {
  const [alignment, setAlignment] = useState<string>('상시');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <TextField
        helperText='글자수는 20자 이내로 작성해주세요'
        id='demo-helper-text-misaligned'
        label='나도도전명'
        className='w-full omyu'
      />

      <ToggleButtonGroup
        color='primary'
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label='Platform'
        className='w-full omyu flex'
      >
        <ToggleButton value='상시' className='flex-1'>
          상시
        </ToggleButton>
        <ToggleButton value='당일' className='flex-1'>
          당일
        </ToggleButton>
        <ToggleButton value='날짜지정' className='flex-1'>
          날짜지정
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
