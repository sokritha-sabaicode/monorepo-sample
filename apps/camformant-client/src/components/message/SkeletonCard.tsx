// components/SkeletonCard.tsx
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="p-4 mb-4 flex items-center gap-8 animate-pulse">
      <div className="w-14 h-14 xl:w-20 xl:h-20 bg-gray-200 rounded-full"></div>
      <div className="flex flex-1 justify-between items-center">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
