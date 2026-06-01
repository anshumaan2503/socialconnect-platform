import { create } from 'zustand';

const useUiStore = create((set) => ({
  toast: {
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'warning' | 'info'
  },
  showToast: (message, severity = 'success') => {
    set({ toast: { open: true, message, severity } });
  },
  hideToast: () => {
    set((state) => ({ toast: { ...state.toast, open: false } }));
  },
}));

export default useUiStore;
