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

const RegisterForm = ({ onNavigateToLogin }) => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const showToast = useUiStore((state) => state.showToast);

  // Local state for credentials
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Local validation/error states
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    // 1. Validation checks
    if (!username || !email || !password || !confirmPassword) {
      setValidationError('All fields are required.');
      showToast('All fields are required.', 'error');
      return;
    }

    if (username.length < 3) {
      setValidationError('Username must be at least 3 characters.');
      showToast('Username must be at least 3 characters.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      showToast('Passwords do not match.', 'error');
      return;
    }

    if (!agreeToTerms) {
      setValidationError('You must agree to the Terms of Service and Privacy Policy.');
      showToast('You must agree to the Terms of Service.', 'error');
      return;
    }

    // Default avatar placeholder URL
    const defaultAvatar = `https://lh3.googleusercontent.com/aida-public/AB6AXuC0m5YSvkGquIekj3V9DLmtmx-cKgYcFnunWmxvqJwhvDW5JpHZI0fU2SUnBGTyYiMxUDdgCNeL86fJL53pck9ugj_5ToFEFqMt-eLkxx3-z4qjpuiE9RvSWFXrZ0feAL44kFcSJt4dW65Wrg4xBHQQPset6SJk-RbM8BNoXR35ex5myeEl28bUbZ7ggdxBm2oRhMs_CVv4E-AEbeEHE6G1CfMvvX9QozjJPIB5VfmUMEZ82D-shBoTQTY64MK_8GvxGmqMaIjAzus`;

    // 2. Call Auth Store Register Action
    const result = await register(username, email, password, defaultAvatar);
    if (result.success) {
      showToast(result.message || 'Account created successfully! Welcome to SocialConnect!', 'success');
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
          <Typography component="h1" sx={{
            fontFamily: 'Inter',
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '32px',
            letterSpacing: '-0.02em',
            color: 'var(--primary)',
            mb: 1
          }}>
            SocialConnect
          </Typography>
          <Typography sx={{
            fontFamily: 'Inter',
            fontSize: '14px',
            color: 'var(--on-surface-variant)'
          }}>
            Create your account to get started.
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
          {/* Username Field */}
          <Box>
            <Typography component="label" htmlFor="username-input" sx={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--on-surface)',
              mb: 0.5
            }}>
              Username
            </Typography>
            <TextField
              id="username-input"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
              fullWidth
              variant="outlined"
              error={!!validationError}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'var(--outline)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person</span>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'var(--surface-container-low)',
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

          {/* Email address Field */}
          <Box>
            <Typography component="label" htmlFor="email-input" sx={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--on-surface)',
              mb: 0.5
            }}>
              Email address
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
                  bgcolor: 'var(--surface-container-low)',
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
                      onClick={() => setShowPassword(!showPassword)}
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
                  bgcolor: 'var(--surface-container-low)',
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

          {/* Confirm Password Field */}
          <Box>
            <Typography component="label" htmlFor="confirm-password-input" sx={{
              display: 'block',
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--on-surface)',
              mb: 0.5
            }}>
              Confirm Password
            </Typography>
            <TextField
              id="confirm-password-input"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      disabled={isLoading}
                      sx={{ color: 'var(--outline)' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'var(--surface-container-low)',
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

          {/* Terms checkbox */}
          <FormControlLabel
            control={
              <Checkbox 
                checked={agreeToTerms} 
                onChange={(e) => setAgreeToTerms(e.target.checked)}
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
              <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--secondary)', userSelect: 'none' }}>
                I agree to the <Link href="#" onClick={(e) => e.preventDefault()} sx={{ color: 'var(--primary)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</Link> and <Link href="#" onClick={(e) => e.preventDefault()} sx={{ color: 'var(--primary)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</Link>
              </Typography>
            }
            sx={{ mt: -0.5 }}
          />

          {/* Register Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              bgcolor: 'var(--primary)',
              color: 'var(--on-primary)',
              borderRadius: '8px',
              py: 1.5,
              fontWeight: 600,
              fontSize: '14px',
              fontFamily: 'Inter',
              textTransform: 'none',
              boxShadow: 'none',
              minHeight: '48px',
              '&:hover': {
                bgcolor: 'var(--surface-tint)',
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
                <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600 }}>Registering...</Typography>
              </Box>
            ) : (
              'Register'
            )}
          </Button>
        </Box>

        {/* Card Footer Links */}
        <Box sx={{ mt: 4, textAlign: 'center', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--secondary)' }}>
            Already have an account?{' '}
            <Link 
              component="button" 
              onClick={onNavigateToLogin}
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
                  color: 'var(--surface-tint)',
                  textDecoration: 'underline'
                }
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
