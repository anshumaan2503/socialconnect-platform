import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore';
import useUiStore from '../store/uiStore';
import { formatRelativeTime } from '../utils/formatTime';

const PostCard = ({ post }) => {
  const currentUser = useAuthStore((state) => state.user);
  const toggleLike = usePostStore((state) => state.toggleLike);
  const addComment = usePostStore((state) => state.addComment);
  const showToast = useUiStore((state) => state.showToast);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Check if current user liked the post
  const isLiked = post.likes.some((like) => like.userId === currentUser?._id);

  const handleLikeToggle = async () => {
    if (!currentUser) {
      showToast('You must be logged in to like posts.', 'warning');
      return;
    }
    const result = await toggleLike(post._id, currentUser);
    if (!result.success) {
      showToast(result.message, 'error');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('You must be logged in to post comments.', 'warning');
      return;
    }
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    const result = await addComment(post._id, commentText, currentUser);
    setSubmittingComment(false);

    if (result.success) {
      setCommentText('');
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Post by ${post.author.username}`,
          text: post.content.text || 'Check out this post on SocialConnect!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${window.location.origin}/posts/${post._id}`
      );
      showToast('Post link copied to clipboard!', 'success');
    }
  };

  return (
    <article className="bg-surface-container-lowest rounded-[16px] shadow-sm overflow-hidden border border-outline-variant/30 select-none transition-all duration-200">
      {/* Author Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20 shrink-0">
            <img
              alt={`${post.author.username}'s Profile Avatar`}
              className="w-full h-full object-cover"
              src={post.author.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9INDqTsIqhtRrsjRnTwQOanmz3PxHxFaEvv7SaVkY0Iuel4XH5eQ0macxY_0pYhX6yNNEo9kFY6ggVOfGIe-VYeQw5-IMbDP-p1Q6pGx1o-Krp-eUPOFnTRyqXcTaNNXy6egP9UzyofUoboxP5C7xFpBYkzvELsLdFdMT6RJs6z8RUj98ti_yS7yEr45a5bwXJGunTMwUBi3-mj0iT1hvh3A44x0Ag96EpmXagsG5PVdmEmv_XbZo3jaP0RyJLFJEyEjWThY_ev0'}
            />
          </div>
          <div>
            <h3 className="font-label-md text-[15px] font-semibold text-on-surface hover:underline cursor-pointer">
              {post.author.username}
            </h3>
            <p className="font-label-sm text-[13px] text-on-surface-variant">
              {formatRelativeTime(post.createdAt)}
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('Options menu is not implemented.', 'info')}
          className="text-on-surface-variant hover:bg-surface-container-highest p-1 rounded-full transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>

      {/* Post Content text */}
      {post.content.text && (
        <div className="px-4 pb-3">
          <p className="font-body-md text-[15px] leading-relaxed text-on-surface whitespace-pre-wrap">
            {post.content.text}
          </p>
        </div>
      )}

      {/* Post Image */}
      {post.content.imageUrl && (
        <div className="w-full aspect-video bg-surface-container-high overflow-hidden border-t border-b border-outline-variant/10">
          <img
            alt="Uploaded Post Visual Media"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            src={post.content.imageUrl}
            loading="lazy"
          />
        </div>
      )}

      {/* Social interaction actions row */}
      <div className="px-4 py-3 flex items-center gap-6 border-b border-outline-variant/30">
        <button
          onClick={handleLikeToggle}
          className={`flex items-center gap-1.5 transition-colors group active:scale-95 duration-100 ${
            isLiked ? 'text-error' : 'text-on-surface-variant hover:text-error'
          }`}
          title={isLiked ? 'Unlike' : 'Like'}
        >
          <span
            className="material-symbols-outlined group-hover:fill-current"
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
          <span className="font-label-md text-sm">{post.totalLikes}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center gap-1.5 transition-colors active:scale-95 duration-100 ${
            showComments ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
          }`}
          title="Comments"
        >
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="font-label-md text-sm">{post.totalComments}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors ml-auto active:scale-95 duration-100"
          title="Share"
        >
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>

      {/* Interactive Comments Thread */}
      {showComments && (
        <div className="bg-surface-container-low/30 border-b border-outline-variant/20 transition-all duration-200">
          {/* List of comments */}
          {post.comments && post.comments.length > 0 ? (
            <div className="p-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto border-b border-outline-variant/10">
              {post.comments.map((comment) => (
                <div key={comment._id} className="flex gap-2 items-start text-[14px]">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden shrink-0 border border-outline-variant/20">
                    {/* Fallback commenter avatar */}
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.username}`}
                      alt={`${comment.username}'s Avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-surface-container-lowest px-3 py-2 rounded-2xl max-w-[85%] border border-outline-variant/20">
                    <div className="flex gap-2 items-baseline mb-0.5">
                      <span className="font-semibold text-on-surface text-[13px]">{comment.username}</span>
                      <span className="text-[11px] text-on-surface-variant">{formatRelativeTime(comment.createdAt)}</span>
                    </div>
                    <p className="text-on-surface text-[13px] leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-on-surface-variant text-sm border-b border-outline-variant/10">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="p-4 bg-surface-container-lowest flex items-start gap-3">
            <img
              alt="Current User Avatar"
              className="w-8 h-8 rounded-full object-cover mt-0.5 shrink-0 border border-outline-variant/30"
              src={currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7pdup5ILSK4O_vsOmDixAFL6G72OZDr5CYnN7pcicdYFoYsPD06-_gI5cqZwDVLjKkA6epocz9nfz_6UzwRO_qzrYHI9hY5TD97D5Cj2m9oGG8DOyWHdopG0gInHa6pIE0OXcxhJ4rAxbwti7D6jJ0BvhtCyexkbOAxd0vVl6Bnwsq6MZ_Fzvv8TcZHGaqq3anzbJvKiM6TvG4949RK4gJi32gXb_w5hqAdjsiG1wKamw2SdVaRGuJkwSPFVcpGpm4ua1vzPEA_M'}
            />
            <div className="flex-1 bg-surface-container border border-outline-variant/50 rounded-full px-4 py-2 flex items-center">
              <input
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-[14px] text-on-surface placeholder-on-surface-variant focus:outline-none"
                placeholder="Write a comment..."
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={submittingComment}
              />
              {commentText.trim() && (
                <button
                  type="submit"
                  disabled={submittingComment}
                  className="text-primary hover:text-primary-container text-xs font-semibold pl-2 transition-colors active:scale-95 duration-100"
                >
                  {submittingComment ? 'Sending...' : 'Post'}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </article>
  );
};

export default PostCard;
