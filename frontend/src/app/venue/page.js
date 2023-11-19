'use client';
import { Navbar } from '../../components/Navbar';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VenueOptions() {
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

  function changeVenue(address) {
    setSelectedVenue(address);
  }

  return (
    <div>
      <Navbar />
      <div className='container mx-auto p-6'>
        <h3 className='text-2xl mt-11 text-black text-left mb-6 font-bold font-poppins'>
          Your event overview.
        </h3>

        <ul class='flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400'>
          <li class='me-2'>
            <a
              href='#'
              class='inline-block px-4 py-3 text-white bg-primary-gray rounded-lg active'
              aria-current='page'
            >
              Venue Options
            </a>
          </li>
          <li class='me-2'>
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
          <li class='me-2'>
            <a
              href='#'
              class='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Activity Quotes
            </a>
          </li>
          <li class='me-2'>
            <a
              href='#'
              class='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Scheduling
            </a>
          </li>
        </ul>

        <Link
          onClick={() => changeVenue('1 Fort Mason San Francisco, CA 94123')}
          href={{
            pathname: '/restaurant-result',
            query: { lat: latlon.lat, long: latlon.lon, selectedVenue },
          }}
          class='mt-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
        >
          <img
            class='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg'
            src='https://fortmason.org/wp-content/uploads/2015/09/GeneralsResidence_2.jpg'
            alt=''
          />
          <div class='flex flex-col justify-between p-4 leading-normal'>
            <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Officers' Club
            </h5>
            <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              1 Fort Mason San Francisco, CA 94123 <br /> Capacity: 400
            </p>
          </div>
        </Link>

        <Link
          onClick={() => changeVenue('99 Grove St, San Francisco, CA 94102')}
          href={{
            pathname: '/restaurant-result',
            query: { lat: latlon.lat, long: latlon.lon, selectedVenue },
          }}
          class='mt-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
        >
          <img
            class='object-cover rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg'
            src='https://apeconcerts.com/bill-graham-civic-auditorium/wp-content/uploads/sites/3/2016/02/bgca-hero-home-no-cones-10-27-17.jpg'
            alt=''
          />
          <div class='flex flex-col justify-between p-4 leading-normal'>
            <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Bill Graham Civic Auditorium
            </h5>
            <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
              99 Grove St, San Francisco, CA 94102 <br /> Capacity: 8,500
            </p>
          </div>
        </Link>

        <a
          onClick={() => changeVenue('2222 Broadway San Francisco, CA 94115')}
          href={{
            pathname: '/restaurant-result',
            query: { lat: latlon.lat, long: latlon.lon, selectedVenue },
          }}
          class='mt-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
        >
          <img
            class='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg'
            src='https://images.squarespace-cdn.com/content/v1/5a15b512d55b41fc35e6a1c2/1511893816694-JTJ892Z9MJH3S5MZ8BI5/EB-Sample-1-EventSpacesPhoto-AnnaDeloresPhotography_160.jpg'
            alt=''
          />
          <div class='flex flex-col justify-between p-4 leading-normal'>
            <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              James Leary Flood Mansion
            </h5>
            <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>              2222 Broadway San Francisco, CA 94115 <br /> Capacity: 700
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
