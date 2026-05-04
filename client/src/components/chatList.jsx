import { useChatStore } from "@/store/useChatStore";
import { NoChatFound, UserLoadingSkeleton } from ".";

const ChatList = () => {
  const { chats, isUserLoading, getChatPartners, setSelectedUser } = useChatStore()
  if(isUserLoading) return <UserLoadingSkeleton/>
  if(chats.length === 0) return <NoChatFound/>
  return <h2>ChatList</h2>;
};

export default ChatList;
