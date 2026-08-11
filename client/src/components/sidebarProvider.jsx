import AppSidebar from './sidebar';
import { SidebarInset, SidebarProvider } from './ui';
import { TooltipProvider } from './ui/tooltip';
const SidebarProviderUI = ({children}) => {
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen={close}
        style={{
          '--sidebar-width-icon': '4rem',
        }}
      >
        <AppSidebar />
        <SidebarInset className='bg-chat-bg m-0! rounded-none!'>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default SidebarProviderUI;
