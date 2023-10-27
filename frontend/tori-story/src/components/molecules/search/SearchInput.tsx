import { IconButton, InputAdornment, TextField } from '@mui/material';
import { SearchIcon, X } from 'lucide-react';
import { useState } from 'react';

type SearchProps = {
  onSearch: (searchText: string) => void;
};

export const SearchInput = ({ onSearch }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchText = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleEnterDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchText);
    }
  };

  const handleIconClick = () => {
    onSearch(searchText);
  };

  const handleClearText = () => {
    setSearchText('');
  };

  return (
    <div>
      <TextField
        placeholder='도전하고 싶은 도전명을 검색해주세요.'
        type='text'
        variant='outlined'
        fullWidth
        size='small'
        sx={{ background: 'white', borderRadius: '4px' }}
        onChange={(word) => handleSearchText(word.target.value)}
        onKeyDown={handleEnterDown}
        value={searchText}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {searchText && (
                <IconButton onClick={handleClearText}>
                  <X size='16' />
                </IconButton>
              )}
              <IconButton onClick={handleIconClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
