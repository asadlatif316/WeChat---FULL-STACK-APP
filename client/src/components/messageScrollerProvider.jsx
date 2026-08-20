import { useAuthStore } from '@/store/useAuthStore';
import {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  Bubble,
  BubbleContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Dialog,
  DialogContent,
} from './ui/index';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { IoCheckmark, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { FaRegClock } from 'react-icons/fa';

const Scroller = ({ messages, receiver }) => {
  const { user } = useAuthStore();
  const [lightbox, setLightbox] = useState(null);
  return (
    <>
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
                          <AvatarImage src={person.profilePicture} />
                          <AvatarFallback className='uppercase'>
                            {person.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </MessageAvatar>
                      <MessageContent className='gap-0'>
                        <Bubble
                          className={cn(
                            'px-3 py-2.5 rounded-3xl overflow-hidden',
                            msg.image && !msg.content && 'p-0',
                          )}
                          variant={isMe ? 'default' : 'outline'}
                        >
                          <BubbleContent>
                            {msg.image && (
                              <img
                                src={msg.image}
                                alt=''
                                onClick={() => setLightbox(msg.image)}
                                className={cn(
                                  'max-w-[240px] w-full cursor-pointer object-cover',
                                  msg.content &&
                                    '-mx-3 -mt-2.5 mb-2 w-[calc(100%+1.5rem)]',
                                )}
                              />
                            )}
                            {msg.content && <p>{msg.content}</p>}
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
                                  <span className='capitalize'>
                                    {msg.status}
                                  </span>
                                </p>
                              ) : msg.status === 'delivered' ? (
                                <p className='flex gap-x-1'>
                                  <IoCheckmarkDoneOutline className='h-4 w-4' />
                                  <span className='capitalize'>
                                    {msg.status}
                                  </span>
                                </p>
                              ) : (
                                <p className='flex gap-x-1'>
                                  <IoCheckmarkDoneOutline
                                    className='h-4 w-4'
                                    color='blue'
                                  />
                                  <span className='capitalize'>
                                    {msg.status}
                                  </span>
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
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className='max-w-3xl p-0'>
          <img src={lightbox} alt='' className='w-full rounded-md' />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Scroller;
