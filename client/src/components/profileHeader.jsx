import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Button
} from './ui';
import { useEffect,useState } from 'react';

const ProfileHeader = () => {
  const { selectedConversation, setSelectedConversation, selectedUser,isTyping,setShowProfile } = useChatStore();
  const { user,onlineUsers } = useAuthStore();
  const person = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user._id)
    : selectedUser;
  selectedUser
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!selectedConversation) return;
    setShowHint(true);
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, [selectedConversation?._id]);

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
    <div className='flex items-center space-x-4 pb-4 cursor-pointer' onClick={()=>setShowProfile(true)}>
      <Avatar size='lg'>
        <AvatarImage src={person.profilePicture} className='object-cover' />
        <AvatarFallback className='capitalize'>
          {person.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className=''>
        <h3 className='capitalize font-semibold text-foreground'>
          {person.name}
        </h3>
        {showHint ? (
          <p className='text-xs text-gray-500'>Click here for more info</p>
        ) : isTyping ? (
          <p className='text-primary text-xs'>Typing...</p>
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
