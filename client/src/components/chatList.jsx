import { useChatStore } from '@/store/useChatStore';
import { NoChatFound, UserLoadingSkeleton } from '.';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

const ChatList = () => {
  const { user } = useAuthStore();
  const { chats, isUserLoading, getChatPartners, setSelectedUser, selectedUser } =
    useChatStore();
  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);
  if (isUserLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;
  return (
    <>
      {chats.map((chat) => {
        const partner = chat.participants.find((p) => p._id !== user.userId);
        return (
          <div
            key={chat._id}
            className={`flex items-center ${selectedUser?._id === chat._id && 'bg-white border-r-4'} rounded-lg p-4 space-x-3   border-primary`}
            onClick={() => setSelectedUser(chat)}
          >
            <div className='relative h-12 w-12 bg-accent rounded-full'>
              <div className='w-3 h-3 border-2 border-white rounded-full bg-primary absolute bottom-0.5 right-0.5'></div>
            </div>
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <h4 className='capitalize font-semibold text-foreground'>
                  {partner.name}
                </h4>
                <span className='text-gray-500 text-sm'>time</span>
              </div>
              <p className='text-gray-500 text-sm'>
                {chat.latestMessage?.content}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatList;
