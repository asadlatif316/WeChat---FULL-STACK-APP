import { useChatStore } from '@/store/useChatStore';
import {
  MessageInput,
  MessageLoadingSkeleton,
  NoChatHistoryPlaceHolder,
  ProfileHeader,
} from '.';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
const ChatContainer = () => {
  const {
    messages,
    selectedConversation,
    getMessagesByUserId,
    isMessagesLoading,
    selectedUser,
  } = useChatStore();
  const { user } = useAuthStore();
  useEffect(() => {
    if (selectedConversation?._id) {
      getMessagesByUserId();
    }
  }, [selectedConversation?._id, selectedUser?._id]);
  const person = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user?.userId)
    : selectedUser;
console.log(messages);

  return (
    <div className='flex flex-col flex-1 overflow-hidden h-full p-4 bg-white'>
      <ProfileHeader />
      <div className='flex-1 overflow-y-auto py-8 border border-gray-400/40 bg-gray-100 rounded-lg '>
        {messages.length > 0 && !isMessagesLoading ? (
          <div className='max-w-3xl mx-auto space-y-6'>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.sender._id === user.userId ? 'justify-end' : 'justify-start'} `}
              >
                <div
                  className={`max-w-xs px-3 py-3 rounded-lg text-sm  ${msg.sender._id === user.userId ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}
                >
                  {msg.content && <p>{msg.content}</p>}
                  <p className='text-xs mt-1'>
                    {msg.createdAt &&
                      new Date(msg.createdAt).toISOString().slice(11, 16)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder user={person} />
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
