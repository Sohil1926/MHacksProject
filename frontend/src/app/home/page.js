'use client';
import { Navbar } from '@/components/Navbar';
import { useState } from 'react';
import DatePicker from 'tailwind-datepicker-react';

const options = {
  title: 'Departure Date',
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: 'Clear',
  maxDate: new Date('2025-01-01'),
  minDate: new Date('2023-11-19'),
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: 'top-12',
  defaultDate: new Date('2023-11-19'),
  language: 'en',
  disabledDates: [],
  weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Select Date',
  inputDateFormatProp: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
};

export default function LaunchPage() {
  const [show, setShow] = useState(false);
  const [landingShow, setLandingShow] = useState(false);

  const handleClose = () => {
    setShow(!show);
  };

  const handleLandingClose = () => {
    setLandingShow(!landingShow);
  };

  return (
    <div>
      <Navbar />
      <div className='container mx-auto p-6'>
        <h5 className='text-2xl mt-11 text-black text-center mb-6 font-poppins'>
          Dream your event to life. We take care of venues, food, <br></br> and
          everything in between.{' '}
        </h5>
        <div className='grid grid-cols-2 gap-4 mt-11'>
          <div className='p-3 bg-white rounded'>
            <div className='flex items-center'>
              <div className='w-6 h-6 bg-primary-gray text-white rounded-full flex items-center justify-center mr-3'>
                1
              </div>
              <label
                htmlFor='input1'
                className='text-sm font-medium text-black'
              >
                What type of event are you organizing?
              </label>
            </div>
            <input
              type='text'
              id='input1'
              className='mt-4 bg-primary-gray block w-full p-2 border border-gray-300 rounded-lg text-white'
            />
          </div>
          <div className='p-3 bg-white rounded'>
            <div className='flex items-center'>
              <div className='w-6 h-6 bg-primary-gray text-white rounded-full flex items-center justify-center mr-3'>
                2
              </div>
              <label
                htmlFor='input2'
                className='text-sm font-medium text-black'
              >
                How many attendees?
              </label>
            </div>
            <input
              type='text'
              id='input2'
              className='mt-4 bg-primary-gray block w-full p-2 border border-gray-300 rounded-lg text-white'
            />
          </div>
          <div className='p-3 bg-white rounded'>
            <div className='flex items-center'>
              <div className='w-6 h-6 bg-primary-gray text-white rounded-full flex items-center justify-center mr-3'>
                2
              </div>
              <label
                htmlFor='input3'
                className='text-sm font-medium text-black'
              >
Event start date?              </label>
            </div>
            <DatePicker
              classNames='mt-4'
              options={options}
              show={show}
              setShow={handleClose}
            />
          </div>
          <div className='p-3 bg-white rounded'>
            <div className='flex items-center'>
              <div className='w-6 h-6 bg-primary-gray text-white rounded-full flex items-center justify-center mr-3'>
                2
              </div>
              <label
                htmlFor='input4'
                className='text-sm font-medium text-black'
              >
                Event end date?
              </label>
            </div>
            <DatePicker
              classNames='mt-4'
              options={options}
              show={landingShow}
              setShow={handleLandingClose}
            />
          </div>
          <div className=' p-3 bg-white rounded'>
            <div className='flex items-center'>
              <div className='w-6 h-6 bg-primary-gray text-white rounded-full flex items-center justify-center mr-3'>
                3
              </div>
              <label
                htmlFor='input5'
                className='text-sm font-medium text-black'
              >
                What's your total budget?
              </label>
            </div>
            <input
              type='text'
              id='input5'
              className='mt-4 bg-primary-gray block w-full p-2 border border-gray-300 rounded-lg text-white'
            />
          </div>
          <div className=' p-3 bg-white rounded'>
            <div className='flex items-center'>
              <div className='w-6 h-6 bg-primary-gray text-white rounded-full flex items-center justify-center mr-3'>
                4
              </div>
              <label
                htmlFor='input6'
                className='text-sm font-medium text-black'
              >
                Which city?
              </label>
            </div>
            <input
              type='text'
              id='input6'
              className='mt-4 bg-primary-gray block w-full p-2 border border-gray-300 rounded-lg text-white'
            />
          </div>
        </div>
        <a href="http://localhost:3000/venue">
  <button className='w-full px-3 h-[100px] py-2 mt-4 text-white bg-primary-gray font-poppins rounded-lg shadow-lg transition-colors duration-300'>
    dream big.
  </button>
</a>
      </div>
    </div>
  );
}
