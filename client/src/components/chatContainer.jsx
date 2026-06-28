import { useChatStore } from '@/store/useChatStore';
import {
  MessageInput,
  MessageLoadingSkeleton,
  NoChatHistoryPlaceHolder,
  ProfileHeader,
} from '.';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useRef } from 'react';
import { IoCheckmark, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';

const ChatContainer = () => {
  const messageEndRef = useRef(null);
  const {
    messages,
    selectedConversation,
    getMessagesByUserId,
    isMessagesLoading,
    selectedUser,
    emitMessageRead,
  } = useChatStore();
  const { user } = useAuthStore();
  useEffect(() => {
    if (selectedConversation?._id || selectedUser?._id) {
      getMessagesByUserId();
      emitMessageRead();
    }
  }, [selectedConversation?._id, selectedUser?._id, getMessagesByUserId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const person = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user?._id)
    : selectedUser;
  return (
    <div className='flex flex-col flex-1 overflow-hidden h-full p-4 bg-white'>
      <ProfileHeader />
      <div className='flex-1 overflow-y-auto py-8 border border-gray-400/40 bg-chat-bg rounded-lg '>
        {messages.length > 0 && !isMessagesLoading ? (
          <div className='max-w-3xl mx-auto space-y-6'>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${msg.sender._id === user._id ? 'justify-end' : 'justify-start'} `}
              >
                <div
                  className={`max-w-xs px-3 py-3 rounded-lg text-sm wrap-break-word  ${msg.sender._id === user._id ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}
                >
                  {msg.content && <p>{msg.content}</p>}
                  <div className='flex gap-x-1 items-center mt-1'>
                    <p className='text-[10px]'>
                      {msg.createdAt &&
                        new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                    </p>
                    <div>
                      {msg.sender._id === user._id &&
                        (msg.status === 'sending' ? (
                          <FaRegClock className='h-4 w-4' />
                        ) : msg.status === 'sent' ? (
                          <IoCheckmark className='h-4 w-4' />
                        ) : msg.status === 'delivered' ? (
                          <IoCheckmarkDoneOutline className='h-4 w-4' />
                        ) : (
                          <IoCheckmarkDoneOutline
                            className='h-4 w-4'
                            color='blue'
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messageEndRef}></div>
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
