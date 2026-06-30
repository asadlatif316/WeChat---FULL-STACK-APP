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
} from './ui';
import { LuMessageSquareShare } from 'react-icons/lu';
import { navItems } from '@/utils/nav';
import { useChatStore } from '@/store/useChatStore';

const AppSidebar = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <Sidebar
      collapsible='icon'
      variant='inset'
      className='**:data-[slot=sidebar-inner]:bg-white **:data-[slot=sidebar-inner]:rounded **:data-[slot=sidebar-inner]:shadow'
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
      <SidebarFooter className='items-center border-t '>
        <Avatar size='lg'>
          <AvatarFallback className='bg-orange-500 text-white'>
            You
          </AvatarFallback>
        </Avatar>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
