import React from 'react';
import { Box, Skeleton } from '@mui/material';

const FeedSkeleton = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {[1, 2].map((val) => (
        <Box 
          key={val}
          sx={{
            bgcolor: 'var(--surface-container-lowest)',
            borderRadius: '16px',
            border: '1px solid rgba(193, 198, 215, 0.3)',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            mb: 3,
            p: 2,
            width: '100%'
          }}
        >
          {/* Header Skeleton */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={20} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="20%" height={16} />
            </Box>
          </Box>

          {/* Text Lines */}
          <Skeleton variant="text" width="95%" height={16} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={16} sx={{ mb: 2 }} />

          {/* Large Image Media block */}
          <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: '8px', mb: 2 }} />

          {/* Actions */}
          <Box sx={{ display: 'flex', gap: 3, mt: 1 }}>
            <Skeleton variant="rectangular" width={50} height={24} sx={{ borderRadius: '4px' }} />
            <Skeleton variant="rectangular" width={50} height={24} sx={{ borderRadius: '4px' }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FeedSkeleton;
