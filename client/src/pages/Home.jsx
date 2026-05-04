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
import { IoSearch } from 'react-icons/io5';

const Home = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <section className='h-screen flex justify-center items-center bg- text-card-foreground'>
      <div className='h-[700px] border-2 border-slate-500 w-full max-w-6xl mx-auto '>
        <div className='h-full w-full flex overflow-hidden'>
          <div className='w-80 flex flex-col p-5'>
            <div>
              <h2 className='text-2xl mb-3'>Messages</h2>
              <div className='relative mb-4'>
                <IoSearch className='absolute left-2 top-2'/>
                <Input placeholder='search chat' className='py-4 pl-7'/>
              </div>
              < ActiveTabSwitch/>
            </div>
            <div className='flex-1 overflow-y-auto space-y-2'>
              {activeTab === 'chats' ? <ChatList /> : <ContactList />}
            </div>
          </div>
          <div className='flex-1 flex flex-col backdrop-blur-sm'>
            <ProfileHeader />
            {selectedUser ? <ChatContainer /> : <NoChatPlaceholder />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
