import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

const FeedFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'liked', label: 'Most Liked' },
    { id: 'newest', label: 'Newest' }
  ];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 1.5, 
        overflowX: 'auto', 
        py: 1,
        width: '100%',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.id;
        return (
          <Button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            sx={{
              fontFamily: 'Inter',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '9999px',
              px: 3,
              py: 0.75,
              minWidth: 'auto',
              whiteSpace: 'nowrap',
              bgcolor: isSelected ? 'var(--primary)' : 'var(--surface-container-lowest)',
              color: isSelected ? '#ffffff' : 'var(--on-surface-variant)',
              border: isSelected ? '1px solid transparent' : '1px solid var(--outline-variant)',
              boxShadow: isSelected ? '0px 2px 4px rgba(0, 87, 194, 0.15)' : 'none',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: isSelected ? 'var(--primary)' : 'var(--surface-container-high)',
                boxShadow: isSelected ? '0px 4px 8px rgba(0, 87, 194, 0.2)' : 'none',
              }
            }}
          >
            {filter.label}
          </Button>
        );
      })}
    </Box>
  );
};

export default FeedFilters;
