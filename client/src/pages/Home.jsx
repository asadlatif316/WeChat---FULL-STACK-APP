import {
  ChatContainer,
  ChatList,
  ContactList,
  EditProfile,
  MyProfile,
  NoChatPlaceholder,
} from '@/components';
import { Input } from '@/components/ui';
import { useChatStore } from '@/store/useChatStore';
import { IoSearch } from 'react-icons/io5';
import { useEffect } from 'react';
import SidebarProviderUI from '@/components/sidebarProvider';
import { useAuthStore } from '@/store/useAuthStore';

const Home = () => {
  const { subscribeToMessage, unSubscribeToMessage,showProfile } = useChatStore();
  useEffect(() => {
    subscribeToMessage();
    return () => unSubscribeToMessage();
  }, []);
  const { activeTab, selectedConversation, selectedUser } = useChatStore();
  return (
    <section className='h-screen flex justify-center items-center text-card-foreground'>
      <div className='h-full bg-chat-bg w-full mx-auto overflow-hidden'>
        <div className='h-full w-full flex overflow-hidden'>
          <SidebarProviderUI>
            <div className='h-full w-full flex p-4'>
              <div className='w-80 flex flex-col space-y-10 pr-4'>
                {activeTab !== 'myProfile' && activeTab !== 'editProfile' && (
                  <div>
                    <h2 className='text-2xl mb-3'>
                      {activeTab === 'chats'
                        ? 'Chats'
                        : activeTab === 'users'
                          ? 'Contacts'
                          : 'Groups'}
                    </h2>
                    <div className='relative'>
                      <IoSearch className='absolute left-2 top-2' />
                      <Input placeholder='search chat' className='py-4 pl-7' />
                    </div>
                  </div>
                )}
                <div className='flex-1 overflow-y-auto space-y-3'>
                  {activeTab === 'chats' ? (
                    <ChatList />
                  ) : activeTab === 'users' ? (
                    <ContactList />
                  ) : activeTab === 'myProfile' ? (
                    <MyProfile />
                  ) : (
                    activeTab === 'editProfile' && <EditProfile />
                  )}
                </div>
              </div>
              <div className='flex-1 flex flex-col backdrop-blur-sm'>
                {selectedConversation || selectedUser ? (
                  <ChatContainer />
                ) : (
                  <NoChatPlaceholder />
                )}
              </div>
              {showProfile && (
                <div className='w-80 shrink-0 border-l'>
                  Profile
                </div>
              )}
            </div>
          </SidebarProviderUI>
        </div>
      </div>
    </section>
  );
};

export default Home;
