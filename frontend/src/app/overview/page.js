'use client';
import { Navbar } from '../../components/Navbar';
// import ChatBox from '@/components/Chatbox';
import BarChart from '@/components/BarChart';
import BudgetChart from '@/components/BarChart';

export default function Overview() {
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
              Overview
            </a>
          </li>
          <li class='me-2'>
            <a
              href='/venue'
              class='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Venue Options
            </a>
          </li>
          <li class='me-2'>
            <a
              href='#'
              class='inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
            >
              Food Quotes
            </a>
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
        <div className='mt-6 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4'>
          <BudgetChart />
        </div>
      </div>
    </div>
  );
}
