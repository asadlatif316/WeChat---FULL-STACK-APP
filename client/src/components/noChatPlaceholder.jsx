import { LuMessageCircle } from 'react-icons/lu';
const NoChatPlaceholder = () => {
  return (
    <div className='bg-white flex flex-col justify-center items-center h-full text-center p-6'>
      <div className='bg-accent w-20 h-20 rounded-full flex items-center justify-center'>
        <LuMessageCircle className='size-10' color='#2e7d32' />
      </div>
      <div>
        <h3 className='font-semibold text-lg text-muted-foreground mb-2'>
          Select a conversation
        </h3>
        <p className='max-w-md '>
          Choose a contact from the sidebar to start chatting or continue a
          previous conversation
        </p>
      </div>
    </div>
  );
};

export default NoChatPlaceholder;
