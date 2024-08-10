'use client';

import { FaArrowUp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from "@/components/Message";

export default function Home() {
  const messages = [
    { text: 'Hello!', isUser: false },
    { text: 'Hi, how are you? I havent seen you in awhile? what happened?', isUser: true },
    { text: 'I am good, thanks!', isUser: false },
    { text: 'Hello!', isUser: false },
    { text: 'Hi, how are you? I havent seen you in awhile? what happened?', isUser: true },
    { text: 'I am good, thanks!', isUser: false },
    { text: 'I am good, thanks!', isUser: false },
    { text: 'Hello!', isUser: false },
    { text: 'Hi, how are you? I havent seen you in awhile? what happened?', isUser: true },
    { text: 'I am good, thanks!', isUser: false },
    { text: 'I am good, thanks!', isUser: false },
    { text: 'Hello!', isUser: false },
    { text: 'Hi, how are you? I havent seen you in awhile? what happened?', isUser: true },
    { text: 'I am good, thanks!', isUser: false },
    
  ];

  return (
    <main className="flex flex-col h-screen w-screen md:w-[70%] mx-auto">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => <Message message={message.text} isUser={message.isUser} />)}
      </div>
      <div className="p-4 border-gray-300 flex flex-row space-x-4 w-full">
        <Input /> 
        <Button onClick={(e) => {console.log('clicked')}}>
          <FaArrowUp />
        </Button>
      </div>
    </main>
  );
}
