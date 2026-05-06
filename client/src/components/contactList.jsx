import { useChatStore } from '@/store/useChatStore';
import { useEffect } from 'react';
import UserLoadingSkeleton from './userLoadingSkeleton';
const ContactList = () => {
  const {
    allContacts,
    isUserLoading,
    getContacts,
    setSelectedUser,
    selectedUser,
  } = useChatStore();
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
            onClick={() => setSelectedUser(contact)}
          >
            <div className='relative h-12 w-12 bg-accent rounded-full'>
              <div className='w-3 h-3 border-2 border-white rounded-full bg-primary absolute bottom-0.5 right-0.5'></div>
            </div>
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
