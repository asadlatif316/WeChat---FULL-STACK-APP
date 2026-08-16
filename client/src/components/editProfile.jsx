import { useAuthStore } from '@/store/useAuthStore';
import { Button, Item, ItemContent, ItemMedia, ItemTitle } from './ui';
import { IoArrowBack } from 'react-icons/io5';
import { Avatar, AvatarImage, AvatarFallback } from './ui';
import { FiCamera } from 'react-icons/fi';
import { Input } from './ui';
import { FormRow } from '.';
import { useRef, useState } from 'react';

const EditProfile = () => {
  const { user } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (selectedImage) {
      formData.set('profilePicture', selectedImage);
    }
    const payload = Object.fromEntries(formData);
  };
  if (!user) return null;
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
          onClick={() => {
            fileInputRef.current.click();
          }}
          className='relative group w-40 h-40 shrink-0 cursor-pointer'
        >
          <Avatar className='w-40 h-40 shrink-0'>
            {selectedImage || user.profilePicture ? (
              <AvatarImage
                src={selectedImage || user.profilePicture}
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

          <Input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div>
        <form className='p-5 flex flex-col gap-y-4' onSubmit={handleSubmit}>
          <FormRow
            label='About'
            name='about'
            className='capitalize p-5'
            defaultValue={'Hello'}
          />
          <FormRow
            label='Name'
            name='name'
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
};

export default EditProfile;
