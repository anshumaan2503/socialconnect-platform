import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Alert, 
  CircularProgress, 
  InputAdornment, 
  IconButton,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';

const LoginForm = ({ onNavigateToRegister }) => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const showToast = useUiStore((state) => state.showToast);

  // Local state for credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Local validation/error states
  const [validationError, setValidationError] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // 1. Inputs validation
    if (!email) {
      setValidationError('Email address is required.');
      showToast('Email address is required.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (!password) {
      setValidationError('Password is required.');
      showToast('Password is required.', 'error');
      return;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    // 2. Call Auth Store Login Action
    const result = await login(email, password);
    if (result.success) {
      showToast(result.message || 'Welcome back to SocialConnect!', 'success');
      navigate('/feed');
    } else {
      setValidationError(result.message);
      showToast(result.message, 'error');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 440, mx: 'auto' }}>
      {/* Main Glassmorphism Card Container */}
      <Box sx={{
        bgcolor: 'var(--surface-container-lowest)',
        borderRadius: '16px',
        boxShadow: '0px 10px 30px rgba(0, 87, 194, 0.06)',
        border: '1px solid rgba(193, 198, 215, 0.3)',
        p: { xs: 4, md: 5 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative blur backgrounds */}
        <Box sx={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 128,
          height: 128,
          bgcolor: 'rgba(0, 87, 194, 0.05)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: -40,
          right: -40,
          width: 128,
          height: 128,
          bgcolor: 'rgba(0, 87, 194, 0.05)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }} />

        {/* Form Header */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            bgcolor: 'var(--primary)',
            color: 'var(--on-primary)',
            mb: 2,
            boxShadow: '0 4px 12px rgba(0, 87, 194, 0.2)'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>
              hub
            </span>
          </Box>
          <Typography component="h1" sx={{
            fontFamily: 'Inter',
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            letterSpacing: '-0.01em',
            color: 'var(--primary)',
            mb: 1
          }}>
            Welcome Back
          </Typography>
          <Typography sx={{
            fontFamily: 'Inter',
            fontSize: '14px',
            color: 'var(--on-surface-variant)'
          }}>
            Sign in to SocialConnect to continue.
          </Typography>
        </Box>

        {/* Visual Error UI Alert */}
        {validationError && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: '8px',
              fontFamily: 'Inter',
              fontSize: '13px',
              bgcolor: 'var(--error-container)',
              color: 'var(--on-error-container)',
              border: '1px solid rgba(186, 26, 26, 0.1)',
              '& .MuiAlert-icon': {
                color: 'var(--error)'
              }
            }}
          >
            {validationError}
          </Alert>
        )}

        {/* Form Content */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, position: 'relative', zIndex: 1 }}>
          {/* Email Address Field */}
          <Box>
            <Typography component="label" htmlFor="email-input" sx={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--on-surface)',
              mb: 0.5
            }}>
              Email Address
            </Typography>
            <TextField
              id="email-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              fullWidth
              variant="outlined"
              error={!!validationError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'var(--outline)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'var(--surface-container-lowest)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  borderRadius: '8px',
                  color: 'var(--on-surface)',
                  transition: 'all 0.2s',
                  '& fieldset': {
                    borderColor: 'var(--outline-variant)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--outline)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)',
                    borderWidth: '1.5px',
                  },
                }
              }}
            />
          </Box>

          {/* Password Field */}
          <Box>
            <Typography component="label" htmlFor="password-input" sx={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--on-surface)',
              mb: 0.5
            }}>
              Password
            </Typography>
            <TextField
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              fullWidth
              variant="outlined"
              error={!!validationError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'var(--outline)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>lock</span>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      disabled={isLoading}
                      sx={{ color: 'var(--outline)' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'var(--surface-container-lowest)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  borderRadius: '8px',
                  color: 'var(--on-surface)',
                  transition: 'all 0.2s',
                  '& fieldset': {
                    borderColor: 'var(--outline-variant)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--outline)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary)',
                    borderWidth: '1.5px',
                  },
                }
              }}
            />
          </Box>

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                sx={{
                  color: 'var(--outline-variant)',
                  '&.Mui-checked': {
                    color: 'var(--primary)',
                  }
                }}
              />
            }
            label={
              <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--on-surface-variant)', userSelect: 'none' }}>
                Remember me
              </Typography>
            }
            sx={{ mt: -0.5 }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              bgcolor: 'var(--primary)',
              color: 'var(--on-primary)',
              borderRadius: '9999px',
              py: 1.5,
              fontWeight: 600,
              fontSize: '14px',
              fontFamily: 'Inter',
              textTransform: 'none',
              boxShadow: 'none',
              minHeight: '48px',
              '&:hover': {
                bgcolor: 'var(--on-primary-fixed-variant)',
                boxShadow: 'none',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(0, 87, 194, 0.4)',
                color: 'rgba(255, 255, 255, 0.8)'
              }
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CircularProgress size={20} color="inherit" />
                <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600 }}>Logging in...</Typography>
              </Box>
            ) : (
              'Login'
            )}
          </Button>
        </Box>

        {/* Card Footer Links */}
        <Box sx={{ mt: 4, textAlign: 'center', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--on-surface-variant)' }}>
            Don't have an account?{' '}
            <Link 
              component="button" 
              onClick={onNavigateToRegister}
              sx={{
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--primary)',
                textDecoration: 'none',
                ml: 0.5,
                border: 'none',
                background: 'none',
                padding: 0,
                cursor: 'pointer',
                '&:hover': {
                  color: 'var(--on-primary-fixed-variant)',
                  textDecoration: 'underline'
                }
              }}
            >
              Create Account
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Demo Access Info Card */}
      <Box sx={{
        mt: 3,
        p: 2.5,
        bgcolor: 'var(--surface-container-low, rgba(0, 87, 194, 0.03))',
        borderRadius: '12px',
        border: '1px dashed var(--outline-variant)',
        textAlign: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5 }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>
            info
          </span>
          <Typography sx={{
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--primary)'
          }}>
            Demo Access Available
          </Typography>
        </Box>
        <Typography sx={{
          fontFamily: 'Inter',
          fontSize: '12px',
          color: 'var(--on-surface-variant)',
          lineHeight: '1.6'
        }}>
          Create a new account using <strong>Register</strong> or check the project documentation (<strong>README.md</strong> / <strong>REVIEWER_GUIDE.md</strong>) for the demo credentials.
        </Typography>
      </Box>

      {/* Trust Indicators */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, color: 'var(--outline)', opacity: 0.6 }}>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>verified_user</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>speed</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>forum</span>
      </Box>
    </Box>
  );
};

export default LoginForm;
