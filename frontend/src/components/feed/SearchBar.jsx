import React, { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import usePostStore from '../../store/postStore';
import useUiStore from '../../store/uiStore';

const SearchBar = () => {
  const searchQuery = usePostStore((state) => state.searchQuery);
  const searchPosts = usePostStore((state) => state.searchPosts);
  const searchError = usePostStore((state) => state.searchError);
  const showToast = useUiStore((state) => state.showToast);

  const [inputValue, setInputValue] = useState(searchQuery);

  // Debounce input to call API after 500ms of inactivity
  useEffect(() => {
    const handler = setTimeout(() => {
      searchPosts(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, searchPosts]);

  // Sync state if searchQuery is reset/cleared from outside (e.g. on feed reset)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Handle API search error notices
  useEffect(() => {
    if (searchError) {
      showToast(searchError, 'error');
    }
  }, [searchError, showToast]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <TextField
        fullWidth
        placeholder="Search across SocialConnect..."
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ color: 'var(--outline)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'var(--surface-container-lowest)',
            fontFamily: 'Inter',
            fontSize: '14px',
            borderRadius: '9999px',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: 'var(--outline-variant)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--outline)',
            },
            '&.Mui-focused': {
              boxShadow: '0px 4px 12px rgba(0, 87, 194, 0.08)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--primary)',
              borderWidth: '1.5px',
            },
          },
          '& .MuiOutlinedInput-input': {
            py: 1.5,
            px: 1,
          }
        }}
      />
    </Box>
  );
};

export default SearchBar;
