import EventSchedule from '@/components/EventSchedule';
import React from 'react';

export default function Page() {
  const scheduleData = [
    {
      title: 'Welcome Breakfast and Introduction',
      time: '8:00 - 9:30',
      tag: 'Food',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Enjoy free breakfast',
    },
    {
      title: 'Ice Breaker Activities',
      time: '9:45 - 11:00',
      tag: 'Activity',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Fun activities at the lobby',
    },
    {
      title: 'Group Photo & Memory Sharing',
      time: '11:15 - 12:30',
      tag: 'Activity',
      location: 'Room 101',
      date: '2023-11-19',
      description: '',
    },
    {
      title: 'Lunch + Networking',
      time: '12:15 - 14:30',
      tag: 'Food',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Enjoy lunch',
    },
    {
      title: 'Dance Workshop',
      time: '14:30 - 15:30',
      tag: 'Workshop',
      location: 'Room 101',
      date: '2023-11-19',
      description: 'Dancing!',
    },
    // ... other events
  ];
  return <EventSchedule schedule={scheduleData} />;
}
