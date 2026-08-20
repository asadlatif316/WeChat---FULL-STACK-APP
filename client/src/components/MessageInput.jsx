import { useChatStore } from '@/store/useChatStore';
import { Button, Input } from './ui';
import { IoIosAddCircle } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { useState, useRef } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { IoMdClose } from 'react-icons/io';

const MessageInput = () => {
  const { user } = useAuthStore();
  const {
    selectedConversation,
    setSelectedConversation,
    setActiveTab,
    selectedUser,
    stopTyping,
  } = useChatStore();
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage, showTyping } = useChatStore();
  const fileInputRef = useRef(null);

  const person = selectedConversation
    ? selectedConversation.participants.find((p) => p._id !== user?._id)
    : selectedUser;
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const conversation = await sendMessage({ content: text.trim() });
    setText('');

    if (conversation) {
      setSelectedConversation(conversation);
      setActiveTab('chats');
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    showTyping(person._id);
    let typingTimeout;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      stopTyping(person._id);
    }, 2000);
  };

  const handleImageChange = (e) => {const file = e.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Image must be under 2MB');
    return;
  }
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;
    setImagePreview(base64Image);
  };};

  return (
    <div className=' mt-4'>
      {imagePreview && (
        <div className='max-w-3xl mx-auto mb-2 flex item-center'>
          <div className='relative'>
            <img
              src={imagePreview}
              className='w-20 h-20 object-cover rounded-md border'
            />
            <Button
              className='absolute -top-1.5 -right-1.5 bg-gray-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow'
              onClick={() => setImagePreview(null)}
            >
              <IoMdClose />
            </Button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className='relative'>
        <Input
          className='pl-10 pr-18 py-7'
          placeholder='Type message'
          value={text}
          onChange={handleChange}
        />
        <IoIosAddCircle
          className='absolute top-4.5 left-2 w-6 h-6 text-gray-500 cursor-pointer'
          onClick={() => fileInputRef.current.click()}
        />
        <Input
          type='file'
          accept='image/*'
          className='hidden'
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <Button
          disabled={!text.trim() && !imagePreview}
          className='absolute top-2.5 right-4 flex justify-center items-center shadow-2xl h-10 w-10'
        >
          <IoSend className='w-6 h-6 text-white' />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
