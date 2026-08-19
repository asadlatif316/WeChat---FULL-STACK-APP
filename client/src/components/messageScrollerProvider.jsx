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
  AvatarImage,
} from './ui/index';

import { IoCheckmark, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';

const Scroller = ({ messages, receiver }) => {
  const { user } = useAuthStore();
  return (
    <MessageScrollerProvider
      autoScroll
      scrollPreviousItemPeek={64}
      defaultScrollPosition='last-anchor'
    >
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent className='flex flex-col gap-6 px-4 py-8'>
            {messages.map((msg, i) => {
              const isLast = i === messages.length - 1;
              const isMe = msg.sender._id === user._id;
              const person = isMe ? user : receiver;

              return (
                <MessageScrollerItem
                  key={msg._id}
                  messageId={msg._id}
                  scrollAnchor={isLast}
                >
                  <Message
                    align={isMe ? 'end' : 'start'}
                    className='items-center'
                  >
                    <MessageAvatar>
                      <Avatar>
                        <AvatarImage src={ person.profilePicture} />
                        <AvatarFallback className='uppercase'>
                          {person.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent className='gap-0'>
                      <Bubble
                        className='px-3 py-2.5 rounded-3xl'
                        variant={isMe ? 'default' : 'outline'}
                      >
                        <BubbleContent>
                          {msg.content && <p className='c'>{msg.content}</p>}
                          <span className='block w-full text-right text-[10px]'>
                            {msg.createdAt &&
                              new Date(msg.createdAt).toLocaleTimeString(
                                undefined,
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                },
                              )}
                          </span>
                        </BubbleContent>
                      </Bubble>
                      <MessageFooter>
                        <div>
                          {isMe &&
                            (msg.status === 'sending' ? (
                              <FaRegClock className='h-4 w-4' />
                            ) : msg.status === 'sent' ? (
                              <p className='flex gap-x-1'>
                                <IoCheckmark className='h-4 w-4' />
                                <span className='capitalize'>{msg.status}</span>
                              </p>
                            ) : msg.status === 'delivered' ? (
                              <p className='flex gap-x-1'>
                                <IoCheckmarkDoneOutline className='h-4 w-4' />
                                <span className='capitalize'>{msg.status}</span>
                              </p>
                            ) : (
                              <p className='flex gap-x-1'>
                                <IoCheckmarkDoneOutline
                                  className='h-4 w-4'
                                  color='blue'
                                />
                                <span className='capitalize'>{msg.status}</span>
                              </p>
                            ))}
                        </div>
                      </MessageFooter>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              );
            })}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
};

export default Scroller;
