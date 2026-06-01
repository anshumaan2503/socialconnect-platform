import { create } from 'zustand';
import postService from '../services/postService';

const usePostStore = create((set, get) => ({
  posts: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNextPage: false
  },
  isLoading: false,
  isCreating: false,
  error: null,

  // Search state
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  searchError: null,

  fetchPosts: async (page = 1, limit = 10, append = false) => {
    set({ isLoading: true, error: null });
    try {
      const data = await postService.getPosts(page, limit);
      const newPosts = data.data?.posts || [];
      const newPagination = data.data?.pagination || {
        currentPage: page,
        totalPages: 1,
        totalPosts: newPosts.length,
        hasNextPage: false
      };

      set((state) => ({
        posts: append ? [...state.posts, ...newPosts] : newPosts,
        pagination: newPagination,
        isLoading: false
      }));
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch posts.';
      set({ error: errorMessage, isLoading: false });
    }
  },

  createPost: async (text, imageFile) => {
    set({ isCreating: true, error: null });
    try {
      const data = await postService.createPost(text, imageFile);
      const newPost = data.data;

      set((state) => ({
        posts: [newPost, ...state.posts],
        isCreating: false
      }));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create post.';
      set({ error: errorMessage, isCreating: false });
      return { success: false, message: errorMessage };
    }
  },

  searchPosts: async (query, page = 1, limit = 10) => {
    set({ searchQuery: query });
    
    // Check constraints: minimum search length is 2 characters
    if (!query || query.trim().length < 2) {
      set({ searchResults: [], isSearching: false, searchError: null });
      return;
    }

    set({ isSearching: true, searchError: null });
    try {
      const data = await postService.searchPosts(query.trim(), page, limit);
      set({
        searchResults: data.data?.posts || [],
        isSearching: false
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to search posts.';
      set({ searchError: errorMessage, isSearching: false });
    }
  },

  toggleLike: async (postId, currentUser) => {
    if (!currentUser) return { success: false, message: 'Must be logged in to like posts.' };

    const { posts, searchResults } = get();
    // Locate post inside either main posts or searchResults
    const targetPost = posts.find((p) => p._id === postId) || searchResults.find((p) => p._id === postId);
    if (!targetPost) return { success: false, message: 'Post not found.' };

    const userLikeIndex = targetPost.likes ? targetPost.likes.findIndex((l) => l.userId === currentUser._id) : -1;
    const hasLiked = userLikeIndex !== -1;

    // Optimistic Update setup
    const updatedLikes = targetPost.likes ? [...targetPost.likes] : [];
    if (hasLiked) {
      updatedLikes.splice(userLikeIndex, 1);
    } else {
      updatedLikes.push({
        userId: currentUser._id,
        username: currentUser.username,
        likedAt: new Date().toISOString()
      });
    }

    const updatedPost = {
      ...targetPost,
      likes: updatedLikes,
      totalLikes: hasLiked ? Math.max(0, targetPost.totalLikes - 1) : (targetPost.totalLikes || 0) + 1
    };

    const mapPost = (list) => list.map((p) => (p._id === postId ? updatedPost : p));
    const originalPosts = posts;
    const originalSearchResults = searchResults;

    // Set optimistic states
    set({
      posts: mapPost(posts),
      searchResults: mapPost(searchResults)
    });

    try {
      const data = await postService.toggleLike(postId);
      const serverTotalLikes = data.data?.totalLikes;
      const serverLikesList = data.data?.likes;

      const syncedPost = {
        ...updatedPost,
        totalLikes: typeof serverTotalLikes === 'number' ? serverTotalLikes : updatedPost.totalLikes,
        likes: serverLikesList || updatedPost.likes
      };

      const mapSynced = (list) => list.map((p) => (p._id === postId ? syncedPost : p));
      set({
        posts: mapSynced(get().posts),
        searchResults: mapSynced(get().searchResults)
      });

      return { success: true };
    } catch (err) {
      // Revert optimistic updates on network failure
      set({
        posts: originalPosts,
        searchResults: originalSearchResults
      });
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update like status.';
      return { success: false, message: errorMessage };
    }
  },

  addComment: async (postId, text, currentUser) => {
    if (!currentUser) return { success: false, message: 'Must be logged in to comment.' };
    if (!text || text.trim().length === 0) return { success: false, message: 'Comment text is required.' };

    const { posts, searchResults } = get();
    const targetPost = posts.find((p) => p._id === postId) || searchResults.find((p) => p._id === postId);
    if (!targetPost) return { success: false, message: 'Post not found.' };

    const tempCommentId = `temp-${Date.now()}`;
    const newCommentOptimistic = {
      _id: tempCommentId,
      userId: currentUser._id,
      username: currentUser.username,
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedPost = {
      ...targetPost,
      comments: targetPost.comments ? [...targetPost.comments, newCommentOptimistic] : [newCommentOptimistic],
      totalComments: (targetPost.totalComments || 0) + 1
    };

    const mapPost = (list) => list.map((p) => (p._id === postId ? updatedPost : p));
    const originalPosts = posts;
    const originalSearchResults = searchResults;

    // Set optimistic states
    set({
      posts: mapPost(posts),
      searchResults: mapPost(searchResults)
    });

    try {
      const data = await postService.addComment(postId, text.trim());
      const savedComment = data.data?.comment || newCommentOptimistic;
      const serverTotalComments = data.data?.totalComments;

      set((state) => {
        const syncPost = (p) => {
          if (p._id !== postId) return p;
          const filteredComments = (p.comments || []).filter((c) => c._id !== tempCommentId);
          return {
            ...p,
            comments: [...filteredComments, savedComment],
            totalComments: typeof serverTotalComments === 'number' ? serverTotalComments : p.totalComments
          };
        };

        return {
          posts: state.posts.map(syncPost),
          searchResults: state.searchResults.map(syncPost)
        };
      });

      return { success: true };
    } catch (err) {
      // Revert optimistic updates on network failure
      set({
        posts: originalPosts,
        searchResults: originalSearchResults
      });
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit comment.';
      return { success: false, message: errorMessage };
    }
  },

  clearSearch: () => {
    set({
      searchQuery: '',
      searchResults: [],
      isSearching: false,
      searchError: null
    });
  },

  resetPosts: () => {
    set({
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        hasNextPage: false
      },
      error: null,
      searchQuery: '',
      searchResults: [],
      isSearching: false,
      searchError: null
    });
  }
}));

export default usePostStore;
