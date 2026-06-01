import React, { useState, useRef } from 'react';
import { Box, Avatar, TextField, Button, Alert, CircularProgress } from '@mui/material';
import ImagePreview from './ImagePreview';
import useUiStore from '../../store/uiStore';
import usePostStore from '../../store/postStore';

const CreatePostCard = () => {
  const showToast = useUiStore((state) => state.showToast);
  const createPost = usePostStore((state) => state.createPost);
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const isCreating = usePostStore((state) => state.isCreating);

  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValidationError('');
    if (!file) return;

    // Validate type (visual check)
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setValidationError('Unsupported file format. Please upload JPEG, PNG, WEBP, or GIF.');
      showToast('Unsupported image format.', 'error');
      return;
    }

    // Validate size (5MB check)
    if (file.size > 5 * 1024 * 1024) {
      setValidationError('File too large. Maximum size is 5MB.');
      showToast('File size exceeds 5MB.', 'error');
      return;
    }

    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImageFile(null);
    setImagePreviewUrl('');
    setValidationError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Clean up object URL on unmount to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile) return;

    const result = await createPost(text.trim(), imageFile);

    if (result.success) {
      setText('');
      handleRemoveImage();
      showToast('Post created successfully!', 'success');
      // Refresh Feed page 1, limit 10, no append
      fetchPosts(1, 10, false);
    } else {
      showToast(result.message || 'Failed to publish post', 'error');
    }
  };

  const isButtonDisabled = isCreating || (!text.trim() && !imageFile);

  return (
    <Box 
      sx={{
        bgcolor: 'var(--surface-container-lowest)',
        borderRadius: '16px',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.04)',
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid rgba(193, 198, 215, 0.3)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Avatar 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-7bWvIPbjA-P6kd2_J9V7R8vrnHy6KEHMQyUxwRdinbGSoHhSuz43vFWqYyMmMUxiLEvplsEd3rppvAgriUZYmTf20HUaQtoyPrD6X9CALbcz_D6ODSq7F-dhsSuz8bPsVVXKQU-0k7kvL_HImBxIhvg9sDvPDQqIy3Vv_2CgoXTjIzKwopN1tuzySkLf2X7X6TcxThUKReizctjRd5HKhQbsgcodiugcfs6s2dQo7WF7DOVaMSViLk7oir60id6e4UalL98_0oY" 
          alt="Current user avatar"
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ flex: 1 }}>
          <TextField
            placeholder="What's on your mind?"
            multiline
            rows={2}
            fullWidth
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isCreating}
            InputProps={{
              disableUnderline: true,
              style: { fontFamily: 'Inter', fontSize: '16px', padding: '4px 0', color: 'var(--on-surface)' }
            }}
          />

          {validationError && (
            <Alert 
              severity="warning" 
              sx={{ 
                mt: 1.5, 
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontSize: '13px'
              }}
            >
              {validationError}
            </Alert>
          )}

          <ImagePreview src={imagePreviewUrl} onRemove={handleRemoveImage} />
        </Box>
      </Box>

      <Box sx={{ borderTop: '1px solid var(--outline-variant)', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input 
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="visual-post-file-input"
          disabled={isCreating}
        />
        
        <label htmlFor="visual-post-file-input">
          <Button
            component="span"
            startIcon={<span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>image</span>}
            disabled={isCreating}
            sx={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 500,
              textTransform: 'none',
              color: 'var(--on-surface-variant)',
              '&:hover': { bgcolor: 'var(--surface-container-high)' }
            }}
          >
            Photo/Video
          </Button>
        </label>

        <Button
          onClick={handlePostSubmit}
          variant="contained"
          disabled={isButtonDisabled}
          sx={{
            bgcolor: 'var(--primary)',
            color: 'var(--on-primary)',
            fontFamily: 'Inter',
            fontSize: '12px',
            fontWeight: 600,
            px: 3,
            py: 1,
            borderRadius: '9999px',
            textTransform: 'none',
            boxShadow: 'none',
            minHeight: '36px',
            '&:hover': { bgcolor: 'var(--on-primary-fixed-variant)', boxShadow: 'none' },
            '&.Mui-disabled': {
              bgcolor: isCreating ? 'var(--primary)' : 'rgba(0, 87, 194, 0.12)',
              color: isCreating ? '#ffffff' : 'rgba(15, 28, 45, 0.26)'
            }
          }}
        >
          {isCreating ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} color="inherit" />
              <span>Posting...</span>
            </Box>
          ) : (
            'Post'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePostCard;
