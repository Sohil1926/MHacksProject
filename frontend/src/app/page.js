'use client';
import { Navbar } from '../components/Navbar';
// import ChatBox from '@/components/Chatbox';
import BarChart from '@/components/BarChart';
import LaunchPage from './home/page';
import BudgetChart from '@/components/BarChart';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [selectedVenue, setSelectedVenue] = useState(
    '99 Grove St, San Francisco, CA 94102'
  );
  const [latlon, setLatLon] = useState({ lat: 0, lon: 0 });
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
    (async () => {
      const { lat, lon } = await getGeocoordinate(selectedVenue);
      setLatLon({ lat, lon });
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
                query: { lat: latlon.lat, long: latlon.lon, selectedVenue },
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
      </div>
      <div className='container mx-auto p-6'>
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
      </div>
    </div>
  );
}

const DestinationCard = ({ title, subtitle, imageUrl }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img className='w-full' src={imageUrl} alt='Destination Image' />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{title}</div>
        <p className='text-gray-700 text-base'>{subtitle}</p>
      </div>
    </div>
  );
};
