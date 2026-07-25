import { useAuthStore } from '@/store/useAuthStore';
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleReactions,
  Avatar,
  AvatarFallback,
} from './ui/index';

const Scroller = ({ messages, receiver }) => {
  const { user } = useAuthStore();
  return (
    <MessageScrollerProvider>
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {messages.map((msg) => (
              <MessageScrollerItem
                key={msg._id}
                messageId={msg._id}
                scrollAnchor={msg._id === user._id}
              >
                <Message align={msg.sender._id !== user._id ? 'start' : 'end'}>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback className='uppercase'>
                        {msg.sender._id === user._id
                          ? user.name.charAt(0)
                          : receiver.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble
                      variant={
                        msg.sender._id !== user._id ? 'outline' : 'default'
                      }
                    >
                      <BubbleContent>{msg.content}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
};

export default Scroller;
