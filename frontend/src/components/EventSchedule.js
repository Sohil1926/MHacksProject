import React, { useState } from 'react';
import { format, addDays, isSameDay, parseISO } from 'date-fns';

const EventSchedule = ({ schedule }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToPreviousDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, -1));
  };

  const goToNextDay = () => {
    setSelectedDate(prevDate => addDays(prevDate, 1));
  };

  // Format the displayed date
  const formattedDate = format(selectedDate, 'EEEE, MMMM do');

  // Filter events for the selected date
  const eventsForSelectedDate = schedule.filter(event =>
    isSameDay(parseISO(event.date), selectedDate)
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
      <button
  onClick={goToPreviousDay}
  className="p-2 rounded-md bg-black text-white hover:bg-gray-700 transition-colors duration-300"
>
  Previous
</button>
<span className="text-lg font-semibold text-black">{formattedDate}</span>
<button
  onClick={goToNextDay}
  className="p-2 rounded-md bg-black text-white hover:bg-gray-700 transition-colors duration-300"
>
  Next
</button>
      </div>
      {eventsForSelectedDate.length > 0 ? (
        eventsForSelectedDate.map((event, index) => (
          <div key={index} className="mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center p-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-gray-500">{event.time}</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
              
              <button className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-300">
                {event.tag}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No events scheduled for this day.</p>
      )}
    </div>
  );
};

export default EventSchedule;
