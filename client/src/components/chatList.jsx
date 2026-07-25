import { useChatStore } from '@/store/useChatStore';
import { NoChatFound, UserLoadingSkeleton } from '.';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar,AvatarFallback,AvatarBadge } from './ui';
import { formatChatTime } from '@/lib/dateTimestamp';

const ChatList = () => {
  const { user,onlineUsers } = useAuthStore(); 

  const {
    chats,
    isUserLoading,
    getChatPartners,
    setSelectedConversation,
    selectedConversation,
  } = useChatStore();
  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);
  if (isUserLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatFound />;
console.log(chats);

  return (
    <>
      {chats.map((chat) => {
        const partner = chat.participants.find((p) => p._id !== user._id);
        return (
          <div
            key={chat._id}
            className={`flex items-center ${selectedConversation?._id === chat._id && 'bg-white border-r-4'} rounded-lg p-4 space-x-3 border-primary`}
            onClick={() => setSelectedConversation(chat)}
          >
            <Avatar size='lg'>
              <AvatarFallback className='capitalize'>
                {partner.name.charAt()}
              </AvatarFallback>
              <AvatarBadge
                className={`${onlineUsers.includes(partner._id) ? 'bg-primary' : 'bg-gray-600'}`}
              />
            </Avatar>
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <h4 className='capitalize font-semibold text-foreground'>
                  {partner.name}
                </h4>
                {chat.latestMessage?.createdAt && (
                  <span className='text-gray-500 text-sm'>
                    {formatChatTime(chat.latestMessage.createdAt)}
                  </span>
                )}
              </div>
              <div className='flex justify-between'>
                <p
                  className={`text-gray-500 text-sm ${chat.latestMessage && chat.latestMessage.sender !== user._id && chat.unread > 0 && 'font-semibold text-black'}`}
                >
                  {chat.latestMessage?.content}
                </p>
                {chat.unread > 0 && (
                  <span className='shrink-0 bg-primary px-2 py-1 text-white rounded shadow-2xl text-xs'>
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatList;
