const SkeletonCard = () => {
    return (
      <div className="animate-pulse bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    );
  };
  
  export default SkeletonCard;
  