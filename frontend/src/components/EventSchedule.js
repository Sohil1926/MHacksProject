import React, { useState } from 'react';
import { format, addDays, isSameDay, parseISO } from 'date-fns';

const EventSchedule = ({ schedule }) => {
  if (schedule.length === 0) return;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToPreviousDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, -1));
  };

  const goToNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  };

  // Format the displayed date
  const formattedDate = format(selectedDate, 'EEEE, MMMM do');

  // Filter and sort events for the selected date
  const eventsForSelectedDate = sortScheduleByTime(
    schedule.filter((event) => isSameDay(parseISO(event.date), selectedDate))
  );

  // Sort function that compares the start times of events
  function sortScheduleByTime(schedule) {
    return schedule.sort((a, b) => {
      // Assuming the time is in 'HH:mm - HH:mm' format, we split and parse the start time
      const startTimeA = parseInt(a.time.split(' - ')[0].replace(':', ''), 10);
      const startTimeB = parseInt(b.time.split(' - ')[0].replace(':', ''), 10);

      return startTimeA - startTimeB;
    });
  }

  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={goToPreviousDay}
          className='px-4 py-2 rounded-md bg-primary-gray text-white hover:bg-gray-700 transition-colors duration-300'
        >
          Previous
        </button>
        <span className='text-lg font-semibold text-black'>
          {formattedDate}
        </span>
        <button
          onClick={goToNextDay}
          className='px-4 py-2 rounded-md bg-primary-gray text-white hover:bg-gray-700 transition-colors duration-300'
        >
          Next
        </button>
      </div>
      {eventsForSelectedDate.length > 0 ? (
        eventsForSelectedDate.map((event, index) => (
          <div key={index} className='mb-4 bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-gray-800 mr-4'>
                  {event.title}
                </h3>
              </div>
              <div className='flex-1'>
                <p className='text-gray-500 mr-4'>
                  {event.time} - {event.location}
                </p>
              </div>
              <div className='flex-1'>
                <p className='text-gray-600 mr-4'>{event.description}</p>
              </div>
              <div className='flex-initial'>
                <button className='px-4 py-2 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300'>
                  {event.tag}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>
          No events scheduled for this day.
        </p>
      )}
    </div>
  );
};

export default EventSchedule;
