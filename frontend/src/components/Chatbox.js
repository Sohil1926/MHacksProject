import React, { useState, useRef, useEffect } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className='fixed bottom-0 right-0 mb-4 mr-4 max-w-sm w-ful'>
      <div className='flex flex-col h-64 shadow-lg rounded-lg overflow-hidden bg-slate-300 pt-4'>
        <div className='flex-grow overflow-y-auto p-3'>
          {messages.map((message, index) => (
            <div
              key={index}
              className='bg-blue-300 text-white rounded px-4 py-2 my-1 self-end'
            >
              {message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={sendMessage}
          className='bg-gray-100 px-4 py-3 flex justify-between'
        >
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Send a message...'
            className='border rounded-full py-2 px-3 mr-2 flex-grow focus:outline-none focus:ring text-black'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-full px-4 py-2 focus:outline-none focus:ring'
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
