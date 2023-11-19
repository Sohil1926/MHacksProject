'use client';
import { Navbar } from '../components/Navbar';
// import ChatBox from '@/components/Chatbox';
import BarChart from '@/components/BarChart';
import LaunchPage from './home/page';
import BudgetChart from '@/components/BarChart';
import EventSchedule from '@/components/EventSchedule';
import Overview from './overview/page';
import VenueOptions from '@/app/venue/page';
import axios from 'axios';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import absoluteUrl from 'next-absolute-url';

async function getScheduleData() {
  const res = await fetch('/api/schedule');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function Home() {
  const [selectedVenue, setSelectedVenue] = useState(
    '99 Grove St, San Francisco, CA 94102'
  );
  const [longlat, setLonglat] = useState({ lat: 0, lon: 0 });
  // const [scheduleData, setScheduleData] = useState([]);
  const [scheduleDataCurrentDay, setScheduleDataCurrentDay] = useState([]);
  const [doneGettingSchedule, setDoneGettingSchedule] = useState(false);
  const [chosenDay, setChosenDay] = useState('');

  const [floorPlanImg, setFloorPlanImg] = useState('');
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

  async function getGeocoordinate(address) {
    try {
      const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            format: 'json',
            q: address,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat, lon };
      } else {
        return { error: 'No results found' };
      }
    } catch (error) {
      console.error(error);
      return { error: 'No results found' };
    }
  }
  useEffect(() => {
    console.log(scheduleDataCurrentDay);
    if (scheduleDataCurrentDay.length > 0) {
      setDoneGettingSchedule(true);
    }
  }, [scheduleDataCurrentDay]);
  useEffect(() => {
    (async () => {
      const { lat, lon } = await getGeocoordinate(selectedVenue);
      setLonglat({ lat, lon });
      // console.log(lat, lon);

      // const localScheduleData = await getScheduleData();

      // console.log(localScheduleData);

      // let scheduleDataWProperFormat =
      //   localScheduleData.schedule[0].activities.map((event) => {
      //     return {
      //       title: event.name,
      //       time: `${event.start_time} - ${event.end_time}}`,
      //       tag: 'FUNNN!',
      //       location: event.room,
      //       date: localScheduleData.schedule[0].day,
      //       description: event.name + 'is so fun!',
      //     };
      //   });
      // // console.log(scheduleDataWProperFormat);
      // setScheduleDataCurrentDay([...scheduleDataWProperFormat]);

      // setScheduleData(localScheduleData.schedule);
      // // setScheduleDataCurrentDay([
      // //   {
      // //     title: 'Broken Glass Everywhere',
      // //     time: '9:00 - 10:00',
      // //     tag: 'Meeting',
      // //     location: 'Room 101',
      // //     date: '2023-11-19',
      // //     description: 'Discuss the recent issues with facility maintenance.',
      // //   },
      // // ]);

      // setChosenDay(localScheduleData.schedule[0].day);
      // // console.log(scheduleData2);
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container mx-auto p-6'>
        <h3 className='text-2xl mt-11 text-black text-left mb-6 font-bold font-poppins'>
          Your event overview.
        </h3>

        <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
          <li className='me-2'>
            <a
              href='#'
              className='inline-block px-4 py-3 text-white bg-primary-gray rounded-lg active'
              aria-current='page'
            >
              Overview
            </a>
          </li>
          <li className='me-2'>
            <a
              href='#'
              className='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Venue Options
            </a>
          </li>
          <li className='me-2'>
            <Link
              href={{
                pathname: '/restaurant-result',
                query: { lat: longlat.lat, long: longlat.lon, selectedVenue },
              }}
              className='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Food Quotes
            </Link>
          </li>
          <li className='me-2'>
            <a
              href='#'
              className='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Registrations
            </a>
          </li>
          <li className='me-2'>
            <a
              href='#'
              className='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Activity Quotes
            </a>
          </li>
        </ul>
        <div className='mt-6 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4'>
          <BudgetChart />
        </div>

        <div className='mt-6 w-full'>
          <h3 className='text-2xl mt-11 text-black text-left mb-6 font-bold font-poppins'>
            Schedule
          </h3>
          <EventSchedule schedule={scheduleData} />{' '}
        </div>
      </div>
      {/* <div className='container mx-auto p-6'>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold'>Popular destinations</h2>
          <p className='text-sm text-gray-500'>
            Based on your location in Ann Arbor
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <DestinationCard
            title='Orlando'
            subtitle='Jan 20 - 27, 2024 Walt Disney World & Universal Studios'
            imageUrl='/placeholder-image-1.png' // Replace with your image path
          />
          <DestinationCard
            title='Miami'
            subtitle='Dec 9 - 15 South Beach, art deco & Little Havana'
            imageUrl='/placeholder-image-2.png' // Replace with your image path
          />
          <DestinationCard
            title='New York'
            subtitle='Dec 9 - 15 Statue of Liberty, skyscrapers & culture'
            imageUrl='/placeholder-image-3.png' // Replace with your image path
          />
        </div>
      </div> */}
    </div>
  );
}
