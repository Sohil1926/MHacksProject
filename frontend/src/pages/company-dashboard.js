'use client';
import { Navbar } from '../components/Navbar';
import '../app/globals.css';


export default function CompanyDashboard() {
  return (
    <div className='bg-white h-full'>
      <Navbar />
      <div className='container mx-auto p-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='input1'
              className='block text-xl font-medium text-black'
            >
              Employee Booking dashboard
            </label>
            <input
              type='text'
              id='input1'
              className='mt-1 block w-full p-2 border border-gray-300 text-black'
            />
          </div>
        
        
        </div>
        <button className='w-full px-3 py-2 mt-4 text-white bg-black hover:bg-black font-poppins'>
          dream.
        </button>
      </div>
    </div>
  );
}
