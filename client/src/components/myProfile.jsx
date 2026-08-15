import { useAuthStore } from '@/store/useAuthStore';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Bubble,
  BubbleContent,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from './ui';
import { getProfileItems } from '@/utils/profileData';
import { useChatStore } from '@/store/useChatStore';

const myProfile = () => {
  const { user, logout } = useAuthStore();
  const { setActiveTab } = useChatStore();
  const ProfileItems = getProfileItems({ user, setActiveTab, logout });
  return (
    <div>
      <div>
        <h2 className='capitalize font-medium text-2xl'>{user.name}</h2>
        <div className='relative flex items-center flex-col p-8'>
          {/* {user.about && ( */}
          <div className='w-full flex justify-center relative'>
            <Bubble className='w-full' variant='outline'>
              <BubbleContent className=' rounded-full'>
                my name is ASad
              </BubbleContent>
            </Bubble>
            <div className='absolute -bottom-2 z-20 w-4 h-4 bg-white rounded-full'></div>
          </div>
          {/* )} */}

          <Avatar className='w-40 h-40'>
            {user.profilePicture ? (
              <AvatarImage src={user.profilePicture} />
            ) : (
              <AvatarFallback className='text-4xl'>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div>
          {ProfileItems.map((item) => (
            <Item
              key={item.id}
              className={` ${
                item.id === 'logout'
                  ? 'hover:bg-destructive/20'
                  : 'hover:bg-white'
              } transition-all duration-300 mb-2  `}
            >
              {item.icon && <ItemMedia>{item.icon}</ItemMedia>}
              <ItemContent>
                <ItemTitle className='font-semibold'>{item.title}</ItemTitle>
                {item.description && (
                  <ItemDescription>{item.description}</ItemDescription>
                )}
              </ItemContent>
            </Item>
          ))}
        </div>
      </div>
    </div>
  );
};

export default myProfile;
