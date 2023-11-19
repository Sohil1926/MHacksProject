'use client';
import { Navbar } from '../components/Navbar';
import ChatBox from '@/components/Chatbox';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto p-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='input1'
              className='block text-sm font-medium text-black'
            >
              What type of event are you organizing?
            </label>
            <input
              type='text'
              id='input1'
              className='mt-1 block w-full p-2 border border-gray-300 text-black'
            />
          </div>
          <div>
            <label
              htmlFor='input2'
              className='block text-sm font-medium text-black'
            >
              How long is the event?
            </label>
            <input
              type='text'
              id='input2'
              className='mt-1 block w-full p-2 border border-gray-300 text-black'
            />
          </div>
          <div>
            <label
              htmlFor='input3'
              className='block text-sm font-medium text-black'
            >
              What's your total budget?
            </label>
            <input
              type='text'
              id='input3'
              className='mt-1 block w-full p-2 border border-gray-300 text-black'
            />
          </div>
          <div>
            <label
              htmlFor='input4'
              className='block text-sm font-medium text-black'
            >
              Which city?
            </label>
            <input
              type='text'
              id='input4'
              className='mt-1 block w-full p-2 border border-gray-300 text-black'
            />
          </div>
        </div>
        <button className='w-full px-3 py-2 mt-4 text-white bg-black hover:bg-black font-poppins'>
          dream.
        </button>
        <ChatBox />
      </div>
    </div>
  );
}
