'use client';

import { useEffect, useRef, useState } from "react";

import { FaArrowUp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Message from "@/components/Message";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [messages, setMessages] = useState([
    {role: 'assistant', content: `Hi! I'm the Headstarter support assistant. How can I help you today?`}
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    if(!message.trim() || isLoading) return;
    setIsLoading(true)

    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    

    try {
      const response = fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify([...messages, {role: 'user', content: message}]),
      })

      if(!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while(true) {
        const {done, value} = await reader.read()
        if(done) break
        const text = decoder.decode(value, {stream: true})
        setMessages((messages) => {
          let lastMessage =  messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {...lastMessage, content: lastMessage.content + text}
          ]
        })
      }
    } catch(err) {
      setMessages((messages) => {
        let lastMessage =  messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          {...lastMessage, role: 'assistant', content: `I'm sorry, I encountered an error. Please try again later.`}
        ]
      })
    }
    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behaviour: 'smooth'})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <main className="flex flex-col h-screen w-screen md:w-[70%] mx-auto">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => <Message key={index} message={message.content} isUser={message.role === 'user'} />)}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-gray-300 flex flex-row space-x-4 w-full">
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading} /> 
        <Button onClick={sendMessage} disabled={isLoading}>
          <FaArrowUp />
        </Button>
      </div>
    </main>
  );
}
