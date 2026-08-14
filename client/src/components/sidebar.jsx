import {
  Sidebar,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from './ui';
import { LuMessageSquareShare } from 'react-icons/lu';
import { navItems } from '@/utils/nav';
import { useChatStore } from '@/store/useChatStore';
import { MdLogout } from 'react-icons/md';
import { useAuthStore } from '@/store/useAuthStore';

const AppSidebar = () => {
  const { activeTab, setActiveTab } = useChatStore();
  const { logout } = useAuthStore();
  return (
    <Sidebar
      collapsible='icon'
      variant='inset'
      className='**:data-[slot=sidebar-inner]:bg-white **:data-[slot=sidebar-inner]:rounded **:data-[slot=sidebar-inner]:shadow bg-chat-bg'
    >
      <SidebarHeader className='flex items-center justify-center mb-2 border-b'>
        <div className='h-12 w-12 bg-primary flex items-center justify-center rounded'>
          <LuMessageSquareShare className='h-6 w-6 ' color='white' />
        </div>
      </SidebarHeader>
      <SidebarContent className='pt-1'>
        <SidebarMenu className='items-center space-y-3'>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id} className='h-full'>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                tooltip={item.tooltip}
                className='group-data-[collapsible=icon]:size-12! [&_svg]:size-6! justify-center items-center'
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='items-center border-t shadow'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar size='lg'>
              <AvatarFallback className='bg-orange-500 text-white'>
                You
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-25 min-w-0 items-center'>
            <DropdownMenuItem onClick={() => setActiveTab('myProfile')}>
              <MdLogout />
              Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
