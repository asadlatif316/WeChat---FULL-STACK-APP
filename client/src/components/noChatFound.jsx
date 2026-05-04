import { LuMessageCircle } from 'react-icons/lu';
import { Button } from './ui';
import { useChatStore } from '@/store/useChatStore';

const NoChatFound = () => {
   const {setActiveTab} = useChatStore()
  return (
    <div className='flex flex-col items-center justify-center text-center py-10 space-y-2 text-muted-foreground'>
      <div className='bg-accent w-16 h-16 rounded-full flex items-center justify-center'>
        <LuMessageCircle className='w-8 h-8' color='#2e7d32' />
      </div>
      <div>
        <h4 className='font-bold mb-1'>No chats yet</h4>
        <p className='px-6'>Start a new chat by selecting a contact from contact tab</p>
      </div>
      <Button onClick={() => setActiveTab('contact')} size='lg'>
        find contact
      </Button>
    </div>
  );
};

export default NoChatFound;
