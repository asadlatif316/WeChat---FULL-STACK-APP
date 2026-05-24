import { LuMessageCircle } from 'react-icons/lu';
import { Button } from './ui';

const noChatHistoryPlaceHolder = ({ user }) => {
  return (
    <div className='bg-gray-100 rounded-lg flex my-auto flex-col justify-center items-center h-full text-center p-6  space-y-2'>
      <div className='bg-accent w-20 h-20 rounded-full flex items-center justify-center'>
        <LuMessageCircle className='size-10' color='#2e7d32' />
      </div>
      <div>
        <h3 className='font-semibold text-lg text-muted-foreground mb-2'>
          Select a conversation with <span className='capitalize'>{user.name}</span>
        </h3>
        <p className='max-w-md '>
          Choose a contact from the sidebar to start chatting or continue a
          previous conversation
        </p>
      </div>
      <div className='flex justify-center gap-2 flex-wrap'>
        <Button>👋 Say Hello</Button>
        <Button>🤝 How are you?</Button>
        <Button>📅 Meet up soon?</Button>
      </div>
    </div>
  );
};

export default noChatHistoryPlaceHolder;
