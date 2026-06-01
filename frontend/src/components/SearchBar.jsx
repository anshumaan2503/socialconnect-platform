import React, { useState, useEffect } from 'react';
import usePostStore from '../store/postStore';

const SearchBar = () => {
  const storeSearchQuery = usePostStore((state) => state.searchQuery);
  const setSearchQuery = usePostStore((state) => state.setSearchQuery);
  const [localQuery, setLocalQuery] = useState(storeSearchQuery);

  // Sync with store query if modified elsewhere (e.g. cleared)
  useEffect(() => {
    setLocalQuery(storeSearchQuery);
  }, [storeSearchQuery]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only trigger if changed and query has at least 2 chars or is empty (to reset)
      if (localQuery !== storeSearchQuery) {
        if (localQuery.trim().length === 0 || localQuery.trim().length >= 2) {
          setSearchQuery(localQuery);
        }
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [localQuery, setSearchQuery, storeSearchQuery]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <div className="relative w-full mt-4 select-none">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-outline">search</span>
      </div>
      <input
        type="text"
        placeholder="Search across SocialConnect..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 rounded-full leading-5 bg-surface-container-lowest border border-outline-variant placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow shadow-sm"
      />
      {localQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors"
          title="Clear search"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
