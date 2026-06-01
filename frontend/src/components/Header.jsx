import React from 'react';
import useAuthStore from '../store/authStore';
import useUiStore from '../store/uiStore';

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const showToast = useUiStore((state) => state.showToast);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border-b border-outline-variant">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto">
        <div className="font-headline-lg text-headline-lg font-bold text-primary">
          SocialConnect
        </div>
        <div className="flex items-center gap-4 text-primary">
          <button
            onClick={() => showToast('Search input is available on the feed page.', 'info')}
            className="p-2 hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-100 flex items-center justify-center"
            title="Search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          
          <button
            onClick={() => showToast('Notifications are not implemented in this version.', 'info')}
            className="p-2 hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-100 flex items-center justify-center"
            title="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>

          {/* User Profile & Logout Action */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden select-none border border-outline-variant/30">
              <img
                src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0m5YSvkGquIekj3V9DLmtmx-cKgYcFnunWmxvqJwhvDW5JpHZI0fU2SUnBGTyYiMxUDdgCNeL86fJL53pck9ugj_5ToFEFqMt-eLkxx3-z4qjpuiE9RvSWFXrZ0feAL44kFcSJt4dW65Wrg4xBHQQPset6SJk-RbM8BNoXR35ex5myeEl28bUbZ7ggdxBm2oRhMs_CVv4E-AEbeEHE6G1CfMvvX9QozjJPIB5VfmUMEZ82D-shBoTQTY64MK_8GvxGmqMaIjAzus'}
                alt={`${user?.username || 'User'}'s Profile Avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-error-container hover:text-error transition-colors rounded-full active:scale-95 duration-100 flex items-center justify-center"
              title="Logout"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
