'use client';
import EventSchedule from '@/components/EventSchedule';
import { Navbar } from '@/components/Navbar';
import React from 'react';

export default function Page() {
  const scheduleData = [
    {
      title: 'Welcome and Break Fast',
      time: '8:00 - 9:30',
      tag: 'Food',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Enjoy free breakfast',
    },
    {
      title: 'Morning Games and Activities',
      time: '9:30 - 10:30',
      tag: 'Game',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Have fun!',
    },
    {
      title: 'Movie Time',
      time: '10:30 - 12:30',
      tag: 'Activity',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Scary movie :)',
    },
    {
      title: 'Lunch + Networking',
      time: '12:30 - 14:00',
      tag: 'Food',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Food food food!!!',
    },
    {
      title: 'Clown Entertainment',
      time: '14:00 - 15:00',
      tag: 'Entertainment',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Are you a clown?',
    },
    {
      title: 'Birthday Party Games',
      time: '15:00 - 16:30',
      tag: 'Game',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Birthday party, you can socialize',
    },
    {
      title: 'Closing Ceremony',
      time: '17:00 - 17:30',
      tag: 'Closing',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Goodbye',
    },
    // ... other events
  ];
  return (
    <>
      <Navbar />
      <div className='mt-6 w-full'>
        <h3 className='text-2xl mt-11 py-5 text-black text-left mb-6 font-bold font-poppins'>
          Schedule
        </h3>
        <EventSchedule schedule={scheduleData} />
      </div>
    </>
  );
}
