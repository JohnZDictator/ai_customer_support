'use client';

import clsx from "clsx";

const Message = ({message, isUser}) => {
  return (
    <div className={clsx('flex w-full my-6', isUser ? 'justify-end' : 'justify-start')}>
        <div className={clsx(
          'max-w-[70%] p-4 rounded-lg',
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-black rounded-bl-none'
        )}>
            {message}
        </div>
    </div>
  );
}

export default Message;