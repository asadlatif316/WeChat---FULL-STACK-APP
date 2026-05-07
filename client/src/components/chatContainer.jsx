import { useChatStore } from "@/store/useChatStore";
import { ProfileHeader } from ".";

const ChatContainer = () => {
  const {messages} = useChatStore()
  return <div className="p-4 bg-white h-full">
    <ProfileHeader />
  </div>;
};

export default ChatContainer;
