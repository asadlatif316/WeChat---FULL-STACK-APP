// data/profileItems.jsx
import { FaRegEdit } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

export const getProfileItems = ({ user, setActiveTab, logout }) => [
  {
    id: 'email',
    icon: null,
    title: 'Email',
    description: user.email,
    variant: 'outline',
  },
  {
    id: 'edit',
    icon: <FaRegEdit className='w-5 h-5'/>,
    title: 'Edit Profile',
    description: 'Name, About',
    onClick: () => setActiveTab('editProfile'),
  },
  {
    id: 'logout',
    icon: <MdLogout className='w-5 h-5'/>,
    title: 'Logout',
    onClick: logout,
  },
];
