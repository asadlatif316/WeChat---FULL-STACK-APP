const MessageLoadingSkeleton = () => {
  return (
    <div className='max-w-3xl space-y-6 mx-auto'>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} animate-pulse`}
        >
          <div className='px-3 py-3 w-32 rounded-lg h-12 bg-accent'></div>
        </div>
      ))}
    </div>
  );
}

export default MessageLoadingSkeleton
