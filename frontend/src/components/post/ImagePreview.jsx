import React from 'react';
import { Box, IconButton } from '@mui/material';

const ImagePreview = ({ src, onRemove }) => {
  if (!src) return null;

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        mt: 2, 
        borderRadius: '8px', 
        overflow: 'hidden', 
        border: '1px solid var(--outline-variant)',
        aspectRatio: '16/9',
        maxWidth: '440px',
        bgcolor: 'var(--surface-container)'
      }}
    >
      <Box 
        component="img"
        src={src}
        alt="Image post attachment preview"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <IconButton 
        onClick={onRemove}
        sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          bgcolor: 'rgba(15, 28, 45, 0.7)', 
          color: '#ffffff',
          '&:hover': { bgcolor: 'rgba(15, 28, 45, 0.9)' },
          p: 0.75
        }}
        title="Remove Selected Image"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px', fontWeight: 'bold' }}>close</span>
      </IconButton>
    </Box>
  );
};

export default ImagePreview;
