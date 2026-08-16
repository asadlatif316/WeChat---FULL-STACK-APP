import { useAuthStore } from "@/store/useAuthStore";
import { Button, Item, ItemContent, ItemMedia, ItemTitle } from "./ui"
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage, AvatarFallback } from "./ui";
import { FiCamera } from 'react-icons/fi';
import { Input } from "./ui";
import { FormRow } from ".";

const EditProfile = () => {
    const {user} = useAuthStore()
  return (
    <div>
      <div>
        <Item>
          <ItemMedia>
            <IoArrowBack className='w-5 h-5' />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className='capitalize text-base'>Edit Profile</ItemTitle>
          </ItemContent>
        </Item>
      </div>
      <div className='flex justify-center p-8'>
        <div
          //   onClick={handleAvatarClick}
          className='relative group w-40 h-40 shrink-0 cursor-pointer'
        >
          <Avatar className='w-40 h-40 shrink-0 group relative'>
            {user.profilePicture ? (
              <AvatarImage
                src={preview || user.profilePicture}
                className='object-cover'
              />
            ) : (
              <AvatarFallback className='text-4xl'>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div
            className='absolute inset-0 rounded-full bg-black/40 flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          >
            <FiCamera className='text-white text-3xl' />
          </div>

          <Input type='file' accept='image/*' className='hidden' />
        </div>
      </div>
      <div>
        <form className='p-5 flex flex-col gap-y-4'>
          <FormRow
            label='About'
            className='capitalize p-5'
            defaultValue={'Hello'}
          />
          <FormRow
            label='Name'
            className='capitalize p-5'
            defaultValue={user.name}
          />
          <Button size='lg' className='p-5 font-bold'>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile
