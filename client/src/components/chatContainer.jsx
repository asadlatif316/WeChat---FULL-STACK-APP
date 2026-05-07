import { useChatStore } from '@/store/useChatStore';
import { NoChatHistoryPlaceHolder, ProfileHeader } from '.';
import { useAuthStore } from '@/store/useAuthStore';
const ChatContainer = () => {
  const { messages, selectedUser } = useChatStore();
  const { user } = useAuthStore();
  const person = selectedUser.participants.find((p) => p._id !== user);
  
  return (
    <div className='p-4 flex flex-col bg-white h-full'>
      <ProfileHeader />
      <div className='flex-1 overflow-y-auto'>
        {messages.length > 0 ? (
          <div></div>
        ) : (
          <NoChatHistoryPlaceHolder user={person} />
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
