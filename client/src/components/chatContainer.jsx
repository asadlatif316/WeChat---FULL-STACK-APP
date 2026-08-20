import { useChatStore } from '@/store/useChatStore';
import {
  MessageInput,
  MessageLoadingSkeleton,
  NoChatHistoryPlaceHolder,
  ProfileHeader,
} from '.';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useRef } from 'react';

import Scroller from './messageScrollerProvider';

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
    <div className='flex flex-col flex-1 overflow-hidden h-full p-4 bg-white rounded shadow'>
      <ProfileHeader />
      <div className='flex-1 overflow-y-auto py-8 border border-gray-400/40 bg-chat-bg rounded-lg '>
        {messages.length > 0 && !isMessagesLoading ? (
          <Scroller messages={messages} receiver={person} />
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
