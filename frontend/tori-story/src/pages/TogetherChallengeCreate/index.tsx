import {
  FormControlLabel,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { cls } from 'utils/cls';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useAtom, useSetAtom } from 'jotai';
import {
  createChallengeDate,
  createChallengeDisplayFlag,
  createChallengeTitle,
} from 'stores/challengeStore';
import { DATETYPE } from 'constants/challengeDateType';
import { useLocation } from 'react-router-dom';

export const TogetherChallengeCreate = () => {
  const currentDate = dayjs();

  const { content } = useLocation().state;

  const [challengeName, setChallengeName] = useAtom(createChallengeTitle);
  const setChallengeEndDate = useSetAtom(createChallengeDate);
  const [challengeDisplayFlag, setChallengeDisplayFlag] = useAtom(createChallengeDisplayFlag);
  const [alignment, setAlignment] = useState<string>('당일');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(currentDate);

  const handleCategoryChange = (_: React.MouseEvent<HTMLElement>, category: string) => {
    setAlignment(category);
    if (category === '당일') {
      setSelectedDate(currentDate);
    } else if (category === '상시') {
      setSelectedDate(null);
    }
  };

  const handleChallengeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setChallengeName(name);

    if (name.length > 20) {
      const truncatedName = name.slice(0, 20);
      setChallengeName(truncatedName);
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeDisplayFlag(event.target.checked);
  };

  useEffect(() => {
    setChallengeEndDate(selectedDate === null ? null : selectedDate.format(`YYYY-MM-DD`));
  }, [selectedDate, setChallengeEndDate]);

  useEffect(() => {
    if (content !== null) setChallengeName(content);
  }, []);

  return (
    <div>
      <TextField
        id='demo-helper-text-misaligned'
        label='도전명'
        className='w-full mt-4'
        value={challengeName}
        disabled={content !== ''}
        onChange={handleChallengeNameChange}
      />
      {content === '' && (
        <div className={cls('mt-4')}>
          <FormControlLabel
            control={<Switch name='gilad' onChange={handleSwitchChange} defaultChecked={true} />}
            label={challengeDisplayFlag ? '공개' : '비공개'}
          />
        </div>
      )}
      <ToggleButtonGroup
        color='primary'
        value={alignment}
        exclusive
        onChange={handleCategoryChange}
        aria-label='Platform'
        className='w-full flex mt-4'
      >
        {DATETYPE.map((option) => (
          <ToggleButton key={option.value} value={option.value} className='flex-1'>
            {option.value}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {alignment === '날짜지정' && (
        <div className={cls('mt-4')}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DesktopDatePicker
                label='종료일'
                format='YYYY-MM-DD'
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                shouldDisableDate={(day) => {
                  return dayjs(dayjs(day as Dayjs).format(`YYYY-MM-DD`)).isBefore(
                    currentDate,
                    'day'
                  );
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}
    </div>
  );
};
