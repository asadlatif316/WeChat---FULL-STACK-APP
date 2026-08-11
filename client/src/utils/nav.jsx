import { HiMiniChatBubbleBottomCenterText } from 'react-icons/hi2';
import { MdOutlineGroups2 } from 'react-icons/md';
import { RiUserAddLine } from 'react-icons/ri';

export const navItems = [
  {
    id: 'chats',
    title: 'Chats',
    tooltip: 'Chats',
    url: '/chats',
    icon: <HiMiniChatBubbleBottomCenterText className='h-7 w-7 ' />,
  },
  {
    id: 'users',
    title: 'Users',
    tooltip: 'Users',
    url: '/users',
    icon: <RiUserAddLine className='h-7 w-7 ' />,
  },
  {
    id: 'groups',
    title: 'Groups',
    tooltip: 'Groups',
    url: '/groups',
    icon: <MdOutlineGroups2 className='h-7 w-7 ' />,
  },
];
