import { useChatStore } from '@/store/useChatStore';
import { Button } from './ui';

const ActiveTab = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className='bg-accent p-2 flex gap-x-1 rounded-xl'>
      <Button
        className={`flex-1 ${activeTab !== 'chats' && 'bg-accent'}`}
        onClick={() => setActiveTab('chats')}
      >
        Chats
      </Button>
      <Button
        className={`flex-1 ${activeTab !== 'contacts' && 'bg-accent'}`}
        onClick={() => setActiveTab('contacts')}
      >
        Contact
      </Button>
      <Button
        className={`flex-1 ${activeTab !== 'groups' && 'bg-accent'}`}
        onClick={() => setActiveTab('groups')}
      >
        Groups
      </Button>
    </div>
  );
};

export default ActiveTab;
