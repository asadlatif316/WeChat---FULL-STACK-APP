import { useChatStore } from '@/store/useChatStore';
import { useEffect } from 'react';
import UserLoadingSkeleton from './userLoadingSkeleton';
import { Avatar, AvatarFallback, AvatarBadge } from './ui';
import { useAuthStore } from '@/store/useAuthStore';
const ContactList = () => {
  const {onlineUsers} = useAuthStore()
  const {
    allContacts,
    isUserLoading,
    getContacts,
    setSelectedUser,
    selectedUser,
    chats, setSelectedConversation,
    setActiveTab
  } = useChatStore();
  console.log(chats);
  
  useEffect(() => {
    getContacts();
  }, [getContacts]);
  if (isUserLoading) return <UserLoadingSkeleton />;
  return (
    <>
      {allContacts.map((contact) => {
        return (
          <div
            key={contact._id}
            className={`flex items-center ${selectedUser?._id === contact._id && 'bg-white border-r-4'} rounded-lg p-4 space-x-3   border-primary`}
            onClick={() => {
              const found = chats.find((chat) =>
                chat.participants.some((c) => c._id === contact._id),
              );
              if (found) {
                setSelectedConversation(found)
                setActiveTab('chats')
              } else {
                setSelectedUser(contact)
              }
            }}
          >
            <Avatar size='lg'>
              <AvatarFallback className='capitalize'>
                {contact.name.charAt()}
              </AvatarFallback>
              <AvatarBadge
                className={`${onlineUsers.includes(contact._id) ? 'bg-primary' : 'bg-gray-600'}`}
              />
            </Avatar>
            <div className='flex-1'>
              <h4 className='capitalize font-semibold text-foreground'>
                {contact.name}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactList;
