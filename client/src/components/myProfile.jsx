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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
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
          {user.about && (
            <div className='w-full flex justify-center relative'>
              <Bubble variant='outline'>
                <BubbleContent className='px-6 rounded-full'>
                  {user.about}
                </BubbleContent>
              </Bubble>
              <div className='absolute z-10 -bottom-2 left-1/2 -translate-x-6 w-5 h-5 bg-white rounded-full'></div>
            </div>
          )}

          {user.profilePicture ? (
            <Dialog>
              <DialogTrigger asChild>
                <Avatar className='w-40 h-40 cursor-pointer'>
                  <AvatarImage src={user.profilePicture} />
                </Avatar>
              </DialogTrigger>

              <DialogContent className='p-0 border-0 bg-transparent sm:max-w-fit'>
                <DialogTitle className='sr-only'>Profile picture</DialogTitle>
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className='max-h-[85vh] max-w-[85vw] rounded-lg object-contain'
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Avatar className='w-40 h-40'>
              <AvatarFallback className='text-4xl'>
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div>
          {ProfileItems.map((item) => (
            <Item
              key={item.id}
              className={` ${
                item.id === 'logout'
                  ? 'hover:bg-destructive/20'
                  : 'hover:bg-white'
              } transition-all duration-300 mb-2  cursor-pointer`}
              onClick={item?.onClick}
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
