const userLoadingSkeleton = () => {
  return (
    <div className='space-y-2'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div className='rounded-lg p-4 animate-pulse '>
          <div className='flex items-center space-x-3'>
            <div className='w-12 h-12 rounded-full bg-accent'></div>
            <div className='flex-1'>
              <div className='h-4 w-3/4 rounded bg-accent mb-2'></div>
              <div className='h-3 w-2/4 rounded bg-accent'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default userLoadingSkeleton;
