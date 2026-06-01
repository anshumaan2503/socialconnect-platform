import API from './api';

const authService = {
  login: async (email, password) => {
    const response = await API.post('/api/auth/login', { email, password });
    return response.data;
  },

  register: async (username, email, password, avatar) => {
    const payload = { username, email, password };
    if (avatar) {
      payload.avatar = avatar;
    }
    const response = await API.post('/api/auth/register', payload);
    return response.data;
  }
};

export default authService;
