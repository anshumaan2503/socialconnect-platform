import { create } from 'zustand';
import authService from '../services/authService';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        set({ token, user, isAuthenticated: true });
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null, isAuthenticated: false });
      }
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const data = await authService.login(email, password);
      const { user, token } = data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true, message: data.message || 'Login successful' };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed.';
      set({ isLoading: false });
      return { success: false, message: errorMessage };
    }
  },

  register: async (username, email, password, avatar) => {
    set({ isLoading: true });
    try {
      const data = await authService.register(username, email, password, avatar);
      const { user, token } = data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, isLoading: false });
      return { success: true, message: data.message || 'Registration successful' };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0] || err.message || 'Registration failed.';
      set({ isLoading: false });
      return { success: false, message: errorMessage };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  }
}));

export default useAuthStore;
