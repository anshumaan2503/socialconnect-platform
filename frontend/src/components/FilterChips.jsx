import React from 'react';
import usePostStore from '../store/postStore';

const FilterChips = () => {
  const currentFilter = usePostStore((state) => state.filter);
  const setFilter = usePostStore((state) => state.setFilter);

  const filters = [
    { id: 'all', label: 'All Posts', icon: null },
    { id: 'liked', label: 'Most Liked', icon: null },
    { id: 'newest', label: 'Newest', icon: null },
    { id: 'trending', label: 'Trending', icon: 'trending_up' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 select-none">
      {filters.map((f) => {
        const isActive = currentFilter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-5 py-1.5 rounded-full font-label-sm text-[13px] whitespace-nowrap shadow-sm border transition-colors font-medium flex items-center gap-1.5 active:scale-95 duration-100 ${
              isActive
                ? 'bg-primary text-on-primary border-transparent'
                : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:bg-surface-container-high'
            }`}
          >
            {f.icon && <span className="material-symbols-outlined text-[16px]">{f.icon}</span>}
            {f.label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
