import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-surface-container-lowest rounded-[16px] shadow-sm p-4 flex flex-col gap-4 border border-outline-variant/20 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-high"></div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-4 w-1/3 bg-surface-container-high rounded"></div>
          <div className="h-3 w-1/4 bg-surface-container-high rounded"></div>
        </div>
      </div>
      {/* Text Lines */}
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-surface-container-high rounded w-full"></div>
        <div className="h-4 bg-surface-container-high rounded w-5/6"></div>
      </div>
      {/* Image Area */}
      <div className="w-full aspect-video bg-surface-container-high rounded-lg"></div>
      {/* Footer Controls */}
      <div className="flex items-center gap-6 border-t border-outline-variant/10 pt-3">
        <div className="h-6 w-12 bg-surface-container-high rounded-full"></div>
        <div className="h-6 w-12 bg-surface-container-high rounded-full"></div>
      </div>
    </div>
  );
};

const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
