import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import useUiStore from '../store/uiStore';

const Toast = () => {
  const toast = useUiStore((state) => state.toast);
  const hideToast = useUiStore((state) => state.hideToast);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideToast();
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ zIndex: 9999 }}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity || 'info'}
        variant="filled"
        sx={{
          width: '100%',
          fontFamily: 'Inter',
          fontSize: '14px',
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
          bgcolor: toast.severity === 'success' ? 'var(--primary)' : 
                   toast.severity === 'error' ? 'var(--error)' : undefined,
          color: '#ffffff',
          '& .MuiAlert-icon': {
            color: '#ffffff'
          }
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
