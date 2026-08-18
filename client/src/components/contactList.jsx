import { useChatStore } from '@/store/useChatStore';
import { useEffect } from 'react';
import UserLoadingSkeleton from './userLoadingSkeleton';
import { Avatar, AvatarFallback, AvatarBadge, AvatarImage } from './ui';
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
  useEffect(() => {
    getContacts();
  }, [getContacts]);
  if (isUserLoading) return <UserLoadingSkeleton />;
  console.log(allContacts);
  
  return (
    <>
      {allContacts.map((contact) => {
        return (
          <div
            key={contact._id}
            className={`flex items-center ${selectedUser?._id === contact._id && 'bg-white border-r-4'} cursor-pointer rounded-lg p-4 space-x-3 border-primary hover:bg-white transition-colors duration-300`}
            onClick={() => {
              const found = chats.find((chat) =>
                chat.participants.some((c) => c._id === contact._id),
              );
              if (found) {
                setSelectedConversation(found);
                setActiveTab('chats');
              } else {
                setSelectedUser(contact);
              }
            }}
          >
            <Avatar size='lg'>
              <AvatarImage
                src={contact.profilePicture}
                className='object-cover'
              />
              <AvatarFallback className='capitalize'>
                {contact.name.charAt(0)}
              </AvatarFallback>
              <AvatarBadge
                className={
                  onlineUsers.includes(contact._id)
                    ? 'bg-primary'
                    : 'bg-gray-600'
                }
              />
            </Avatar>
            <div className='flex-1 min-w-0'>
              <h4 className='capitalize font-semibold text-foreground'>
                {contact.name}
              </h4>
              {contact.about && (
                <p className='text-gray-500 text-sm line-clamp-1'>
                  {contact.about}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactList;
