import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import {
  Item,
  ItemTitle,
  ItemContent,
  ItemDescription,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  Avatar,
  ItemMedia,
} from './ui';
import { IoMdClose } from 'react-icons/io';
import { Separator } from './ui/separator';

const PartnerProfile = () => {
  const { selectedConversation, selectedUser, setShowProfile } = useChatStore();
  const { user } = useAuthStore();

  const person = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user._id)
    : selectedUser;
  if (!person) return;
  return (
    <div className='flex-1 lg:flex-none lg:w-96 shrink-0 overflow-y-auto border-l h-full items-center pl-4'>
      <Item>
        <ItemMedia
          onClick={() => setShowProfile(false)}
          className='cursor-pointer'
        >
          <IoMdClose className='h-6 w-6' />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className='capitalize text-base'>Contact Info</ItemTitle>
        </ItemContent>
      </Item>
      <div className='flex flex-col space-y-3 items-center'>
        <Avatar className='h-40 w-40'>
          <AvatarImage src={person.profilePicture} className='object-cover' />
          <AvatarFallback className='text-4xl'>
            {person.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h3 className='text-2xl'>{person.name}</h3>
        <p className='text-gray-600'>{person.email}</p>
        {person.about && (
          <Item>
            <ItemContent className='min-w-0'>
              <ItemTitle className='text-base text-gray-600'>About</ItemTitle>
              <ItemDescription className='text-base truncate text-black'>
                {person.about}
              </ItemDescription>
            </ItemContent>
          </Item>
        )}
        <Separator />
      </div>
    </div>
  );
};

export default PartnerProfile;
