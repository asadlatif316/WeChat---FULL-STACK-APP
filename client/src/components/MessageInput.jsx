import { useChatStore } from '@/store/useChatStore';
import { Button, Input } from './ui';
import { IoIosAddCircle } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { useState } from 'react';

const MessageInput = () => {
  const [text, setText] = useState('');
  const { sendMessage } = useChatStore();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage({ content: text.trim() });
    setText('');
  };
  return (
    <div className=' mt-4'>
      <form onSubmit={handleSendMessage} className='relative'>
        <Input
          className='pl-10 pr-18 py-7'
          placeholder='Type message'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <IoIosAddCircle className='absolute top-4.5 left-2 w-6 h-6 text-gray-500' />
        <Button className='absolute top-2.5 right-4 flex justify-center items-center shadow-2xl h-10 w-10'>
          <IoSend className='w-6 h-6 text-white' />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
