import React from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';

const FeedHeader = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useUiStore((state) => state.showToast);

  // Use a fallback avatar URL matching Stitch design
  const defaultAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuC0m5YSvkGquIekj3V9DLmtmx-cKgYcFnunWmxvqJwhvDW5JpHZI0fU2SUnBGTyYiMxUDdgCNeL86fJL53pck9ugj_5ToFEFqMt-eLkxx3-z4qjpuiE9RvSWFXrZ0feAL44kFcSJt4dW65Wrg4xBHQQPset6SJk-RbM8BNoXR35ex5myeEl28bUbZ7ggdxBm2oRhMs_CVv4E-AEbeEHE6G1CfMvvX9QozjJPIB5VfmUMEZ82D-shBoTQTY64MK_8GvxGmqMaIjAzus";

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  return (
    <Box 
      component="header" 
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '64px',
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--outline-variant)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box 
        sx={{
          width: '100%',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Left: App Logo/Title */}
        <Typography 
          variant="h6" 
          component="div"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 800,
            fontSize: '24px',
            color: 'var(--primary)',
            letterSpacing: '-0.02em',
            userSelect: 'none'
          }}
        >
          SocialConnect
        </Typography>

        {/* Right: Logged-in User & Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid var(--outline-variant)'
              }}
            >
              <Avatar 
                src={user?.avatar || defaultAvatar} 
                alt={`${user?.username || 'User'}'s Profile Avatar`}
                sx={{ width: '100%', height: '100%' }}
              />
            </Box>
            <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: 'var(--on-surface)' }}>
              {user?.username}
            </Typography>
          </Box>

          <IconButton 
            onClick={handleLogout}
            sx={{ 
              color: 'var(--error, #ba1a1a)',
              p: 1,
              '&:hover': { bgcolor: 'var(--error-container, #ffebee)' }
            }}
            title="Logout"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>logout</span>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedHeader;
