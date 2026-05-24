import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { useEffect } from 'react';

const ProfileHeader = () => {
  const { selectedConversation, setSelectedConversation, selectedUser,isTyping } = useChatStore();
  const { user,onlineUsers } = useAuthStore();
  const person = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user.userId)
    : selectedUser;
  selectedUser
  console.log(isTyping);
  

  useEffect(() => {
    const handleESCKey = (event) => {
      if (event.key === 'Escape') {
        setSelectedConversation(null);
      };
    };

    window.addEventListener('keydown', handleESCKey);

    return () => window.removeEventListener('keydown', handleESCKey);
  }, [setSelectedConversation]);

  return (
    <div className='flex items-center space-x-4 pb-4'>
      <div className='h-12 w-12 rounded-full bg-accent'></div>
      <div className=''>
        <h3 className='capitalize font-semibold text-foreground'>
          {person.name}
        </h3>
        {isTyping ? (
          <p className='text-primary text-xs'>Typing</p>
        ) : (
          <p className='text-primary text-xs'>
            {onlineUsers.includes(person._id) ? 'online' : 'offline'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
