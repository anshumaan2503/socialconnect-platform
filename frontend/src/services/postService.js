import API from './api';

const postService = {
  getPosts: async (page = 1, limit = 10) => {
    const response = await API.get('/api/posts', {
      params: { page, limit }
    });
    return response.data;
  },

  createPost: async (text, imageFile) => {
    const formData = new FormData();
    if (text) {
      formData.append('text', text);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await API.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  searchPosts: async (query, page = 1, limit = 10) => {
    const response = await API.get('/api/posts/search', {
      params: { q: query, page, limit }
    });
    return response.data;
  },

  toggleLike: async (postId) => {
    const response = await API.post(`/api/posts/${postId}/like`);
    return response.data;
  },

  addComment: async (postId, text) => {
    const response = await API.post(`/api/posts/${postId}/comment`, { text });
    return response.data;
  }
};

export default postService;
