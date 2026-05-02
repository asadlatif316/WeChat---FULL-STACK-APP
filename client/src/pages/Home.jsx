import {
  ActiveTabSwitch,
  ChatContainer,
  ChatList,
  ContactList,
  NoChatPlaceholder,
  ProfileHeader,
} from '@/components';
import { Input } from '@/components/ui';
import { useChatStore } from '@/store/useChatStore';

const Home = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <section className='h-screen bg-background '>
      <div className='flex overflow-hidden'>
        <div className='w-96 flex flex-col'>
          <div>
            <h2>Messages</h2>
            <Input />
            <ActiveTabSwitch />
          </div>
          <div className='flex-1 overflow-y-auto space-y-2'>
            {activeTab ? <ChatList /> : <ContactList />}
          </div>
        </div>
        <div className='flex-1 flex flex-col backdrop-blur-sm'>
          <ProfileHeader />
          {selectedUser ? <ChatContainer /> : <NoChatPlaceholder />}
        </div>
      </div>
    </section>
  );
};

export default Home;
