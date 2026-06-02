import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Divider, Button } from '@mui/material';
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/postStore';
import useUiStore from '../../store/uiStore';

const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Just now';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  } catch (e) {
    return 'Just now';
  }
};

const PostCard = ({ post }) => {
  const user = useAuthStore((state) => state.user);
  const toggleLike = usePostStore((state) => state.toggleLike);
  const addComment = usePostStore((state) => state.addComment);
  const showToast = useUiStore((state) => state.showToast);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Dynamically sync like status and count directly from the post prop (Zustand store state)
  const liked = post.likes ? post.likes.some((l) => l.userId === user?._id) : false;
  const likeCount = post.totalLikes || 0;

  const handleLikeToggle = async () => {
    const result = await toggleLike(post._id, user);
    if (!result.success) {
      showToast(result.message || 'Failed to toggle like.', 'error');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const trimmedText = commentText.trim();

    if (trimmedText.length < 1) {
      showToast('Comment text cannot be empty.', 'warning');
      return;
    }

    if (trimmedText.length > 500) {
      showToast('Comment text exceeds 500 characters limit.', 'warning');
      return;
    }

    const result = await addComment(post._id, trimmedText, user);
    if (result.success) {
      setCommentText('');
      showToast('Comment added successfully!', 'success');
      setShowComments(true); // Ensure comments list is expanded
    } else {
      showToast(result.message || 'Failed to post comment.', 'error');
    }
  };

  return (
    <Box 
      component="article"
      sx={{
        bgcolor: 'var(--surface-container-lowest)',
        borderRadius: '16px',
        border: '1px solid rgba(193, 198, 215, 0.3)',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
        mb: 3,
        width: '100%'
      }}
    >
      {/* Header section */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar 
            src={post.author?.avatar || ''} 
            alt={`${post.author?.username || 'User'}'s avatar`}
            sx={{ width: 40, height: 40, border: '1px solid var(--outline-variant)' }}
          >
            {post.author?.username ? post.author.username.substring(0, 2).toUpperCase() : 'U'}
          </Avatar>
          <Box>
            <Typography 
              sx={{ 
                fontFamily: 'Inter', 
                fontSize: '15px', 
                fontWeight: 600, 
                color: 'var(--on-surface)',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {post.author?.username}
            </Typography>
            <Typography sx={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
              {post.timestamp || formatTimeAgo(post.createdAt)}
            </Typography>
          </Box>
        </Box>

        <IconButton sx={{ color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined">more_horiz</span>
        </IconButton>
      </Box>

      {/* Post Text */}
      {post.content?.text && (
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Typography 
            sx={{ 
              fontFamily: 'Inter', 
              fontSize: '15px', 
              lineHeight: 1.6, 
              color: 'var(--on-surface)',
              whiteSpace: 'pre-wrap'
            }}
          >
            {post.content.text}
          </Typography>
        </Box>
      )}

      {/* Post Image */}
      {post.content?.imageUrl && (
        <Box 
          sx={{ 
            width: '100%', 
            maxHeight: '450px',
            bgcolor: 'var(--surface-container-high)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box 
            component="img"
            src={post.content.imageUrl}
            alt="Post image attachment"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
      )}

      {/* Post Stats & Actions */}
      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Button
          onClick={handleLikeToggle}
          startIcon={
            <span 
              className="material-symbols-outlined" 
              style={{ 
                fontSize: '20px',
                fontVariationSettings: liked ? "'FILL' 1" : undefined
              }}
            >
              favorite
            </span>
          }
          sx={{
            fontFamily: 'Inter',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'none',
            color: liked ? 'var(--error)' : 'var(--on-surface-variant)',
            minWidth: 'auto',
            p: 1,
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'rgba(186, 26, 26, 0.05)',
              color: 'var(--error)'
            }
          }}
        >
          {likeCount}
        </Button>

        <Button
          onClick={() => setShowComments(!showComments)}
          startIcon={
            <span 
              className="material-symbols-outlined" 
              style={{ 
                fontSize: '20px',
                fontVariationSettings: showComments ? "'FILL' 1" : undefined
              }}
            >
              chat_bubble
            </span>
          }
          sx={{
            fontFamily: 'Inter',
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'none',
            color: showComments ? 'var(--primary)' : 'var(--on-surface-variant)',
            minWidth: 'auto',
            p: 1,
            borderRadius: '8px',
            '&:hover': {
              bgcolor: 'rgba(0, 87, 194, 0.05)',
              color: 'var(--primary)'
            }
          }}
        >
          {post.totalComments || 0}
        </Button>

        <IconButton 
          sx={{ 
            ml: 'auto', 
            color: 'var(--on-surface-variant)',
            '&:hover': { bgcolor: 'var(--surface-container-high)' }
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>share</span>
        </IconButton>
      </Box>

      {/* Expandable Comments List Section */}
      {showComments && (
        <Box sx={{ bgcolor: 'rgba(248, 249, 255, 0.3)', borderTop: '1px solid rgba(193, 198, 215, 0.2)' }}>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <Box key={comment._id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Avatar 
                    src={comment.avatar || ''} 
                    alt={`${comment.username || 'User'}'s avatar`}
                    sx={{ width: 32, height: 32, border: '1px solid var(--outline-variant)' }}
                  >
                    {comment.username ? comment.username.substring(0, 2).toUpperCase() : 'U'}
                  </Avatar>
                  <Box 
                    sx={{ 
                      flex: 1, 
                      bgcolor: 'var(--surface-container-low)', 
                      borderRadius: '12px', 
                      p: 1.5,
                      border: '1px solid rgba(193, 198, 215, 0.2)'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: 'var(--on-surface)' }}>
                        {comment.username}
                      </Typography>
                      <Typography sx={{ fontFamily: 'Inter', fontSize: '11px', color: 'var(--on-surface-variant)' }}>
                        {formatTimeAgo(comment.createdAt)}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--on-surface)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                      {comment.text}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3, gap: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--outline-variant)' }}>
                  chat_bubble_outline
                </span>
                <Typography sx={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--on-surface-variant)', textAlign: 'center', fontWeight: 500 }}>
                  No comments yet. Be the first to share your thoughts!
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Comments Input Area */}
      <Divider sx={{ borderColor: 'rgba(193, 198, 215, 0.2)' }} />
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0.5, bgcolor: 'rgba(248, 249, 255, 0.4)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar 
            src={user?.avatar || ''} 
            alt="Current user avatar placeholder"
            sx={{ width: 32, height: 32 }}
          >
            {user?.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
          </Avatar>
          <Box 
            component="form"
            onSubmit={handleCommentSubmit}
            sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center',
              bgcolor: 'var(--surface-container-low)', 
              border: '1px solid rgba(193, 198, 215, 0.5)',
              borderRadius: '9999px',
              pl: 2,
              pr: 0.5,
              py: 0.25
            }}
          >
            <Box 
              component="input"
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onFocus={() => setShowComments(true)}
              sx={{
                width: '100%',
                bgcolor: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter',
                fontSize: '14px',
                color: 'var(--on-surface)',
                '&::placeholder': { color: 'var(--on-surface-variant)' }
              }}
            />
            <IconButton 
              type="submit"
              disabled={!commentText.trim()}
              sx={{
                p: 0.5,
                color: commentText.trim() ? 'var(--primary)' : 'var(--outline)',
                '&.Mui-disabled': { color: 'rgba(0, 0, 0, 0.12)' }
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>send</span>
            </IconButton>
          </Box>
        </Box>

        {commentText.length > 400 && (
          <Typography 
            sx={{ 
              fontFamily: 'Inter', 
              fontSize: '11px', 
              color: commentText.length > 500 ? 'var(--error)' : 'var(--on-surface-variant)', 
              alignSelf: 'flex-end',
              mr: 2,
              mt: 0.5
            }}
          >
            {commentText.length}/500
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PostCard;
