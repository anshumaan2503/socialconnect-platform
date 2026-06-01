import React, { useState, useRef } from 'react';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore';
import useUiStore from '../store/uiStore';

const CreatePostCard = () => {
  const user = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
  const showToast = useUiStore((state) => state.showToast);

  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [posting, setPosting] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast('Unsupported image format. Please upload JPEG, PNG, or WEBP.', 'error');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size cannot exceed 5MB.', 'error');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePostSubmit = async () => {
    const textTrimmed = text.trim();
    if (!textTrimmed && !imageFile) {
      showToast('Please add text or select an image to post.', 'warning');
      return;
    }

    setPosting(true);
    const result = await createPost(textTrimmed, imageFile);
    setPosting(false);

    if (result.success) {
      showToast('Post published successfully!', 'success');
      setText('');
      handleRemoveImage();
    } else {
      showToast(result.message, 'error');
    }
  };

  // Determine if post button is disabled
  const isDisabled = posting || (!text.trim() && !imageFile);

  return (
    <div className="bg-surface-container-lowest rounded-[16px] shadow-sm p-4 flex flex-col gap-3 border border-outline-variant/30 select-none">
      <div className="flex items-start gap-3">
        <img
          alt="Current User Avatar"
          className="w-10 h-10 rounded-full object-cover shrink-0 border border-outline-variant/30"
          src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-7bWvIPbjA-P6kd2_J9V7R8vrnHy6KEHMQyUxwRdinbGSoHhSuz43vFWqYyMmMUxiLEvplsEd3rppvAgriUZYmTf20HUaQtoyPrD6X9CALbcz_D6ODSq7F-dhsSuz8bPsVVXKQU-0k7kvL_HImBxIhvg9sDvPDQqIy3Vv_2CgoXTjIzKwopN1tuzySkLf2X7X6TcxThUKReizctjRd5HKhQbsgcodiugcfs6s2dQo7WF7DOVaMSViLk7oir60id6e4UalL98_0oY'}
        />
        <div className="flex-1">
          <textarea
            className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 font-body-lg text-body-lg text-on-surface placeholder-on-surface-variant min-h-[60px] mt-2 focus:outline-none"
            placeholder="What's on your mind?"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Client-Side Image Preview */}
          {imagePreview && (
            <div className="relative mt-3 rounded-lg overflow-hidden border border-outline-variant/50 aspect-video max-w-md bg-surface-container">
              <img
                src={imagePreview}
                alt="Upload Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-on-surface/80 text-surface rounded-full p-1.5 hover:bg-on-surface transition-colors flex items-center justify-center shadow-md active:scale-95 duration-100"
                title="Remove image"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-outline-variant pt-3 flex justify-between items-center">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          id="post-image-file"
        />
        <label
          htmlFor="post-image-file"
          className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors flex items-center gap-2 cursor-pointer active:scale-95 duration-100"
        >
          <span className="material-symbols-outlined text-primary">image</span>
          <span className="hidden md:inline text-sm font-medium select-none">Photo/Video</span>
        </label>

        <button
          onClick={handlePostSubmit}
          disabled={isDisabled}
          className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all shadow-sm flex items-center justify-center min-w-[80px] ${
            isDisabled
              ? 'bg-outline-variant text-on-surface-variant opacity-60 cursor-not-allowed'
              : 'bg-primary text-on-primary hover:bg-primary/90 active:scale-95 duration-100'
          }`}
        >
          {posting ? 'Posting...' : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard;
