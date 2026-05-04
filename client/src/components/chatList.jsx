import { useChatStore } from "@/store/useChatStore";
import { NoChatFound } from ".";

const ChatList = () => {
  const { chats, isUserLoading, getChatPartners, setSelectedUser } = useChatStore()
  if(chats.length === 0) return <NoChatFound/>
  return <h2>ChatList</h2>;
};

export default ChatList;
