import { useChatStore } from '@/store/useChatStore';
import { NoChatFound, UserLoadingSkeleton } from '.';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Avatar, AvatarFallback, AvatarImage } from './ui';
import { formatChatTime } from '@/lib/dateTimestamp';
import { IoImageOutline } from 'react-icons/io5';

const renderPreview = (msg) => {
  if (!msg) return null;
  if (msg.image) {
    return (
      <span className='flex items-center gap-1 min-w-0'>
        <IoImageOutline className='h-4 w-4 shrink-0' />
        <span className='truncate'>{msg.content || 'Image'}</span>
      </span>
    );
  }
  return <span className='truncate'>{msg.content}</span>;
};
const ChatList = () => {
  const { user, onlineUsers } = useAuthStore();

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
              <AvatarImage
                src={partner.profilePicture}
                className='object-cover'
              />
              <AvatarFallback className='capitalize'>
                {partner.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
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
              <div className='flex min-w-0 justify-between'>
                <p
                  className={`text-gray-500 text-sm truncate min-w-0 ${
                    chat.latestMessage?.sender !== user._id &&
                    chat.unread > 0 &&
                    'font-semibold text-black'
                  }`}
                >
                  {renderPreview(chat.latestMessage)}
                </p>
                {chat.latestMessage.sender !== user._id && chat.unread > 0 && (
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
