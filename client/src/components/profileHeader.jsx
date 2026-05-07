import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const ProfileHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { user } = useAuthStore()
  const person = selectedUser.participants.find(p => p._id !== user)

  
  return (
    <div className='flex items-center space-x-4'>
      <div className='h-12 w-12 rounded-full bg-accent'></div>
      <div className=''>
        <h3 className='capitalize font-semibold text-foreground'>
          {person.name}
        </h3>
        <p className='text-primary text-sm'>online</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
