'use client';
import { useRef, useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Navbar } from '../components/Navbar';
import '../app/globals.css';

export default function CompanyDashboard() {
  '';
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  function downloadUpdatedCsv(updatedCsv) {
    const blob = new Blob([updatedCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'flight_cost_filled_in.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function callApiWithRowData(rowData) {
    // Replace with your actual API call logic
    // const response = await fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(rowData),
    // });

    // const result = await response.json();
    return [69, 'google.com']; // Assuming the API returns the new data to be added to the CSV
  }

  // Mock data for the table
  const mockData = [
    {
      departLocation: 'Sedaparlocation',
      employee: 'Jeff Jonas',
      flightPrice: '$201.11',
      hotelPrice: '$728.19',
      ticketTier: 'High',
    },
    // ... add more rows as needed
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Process the file or update the state as needed
    }
  };

  useEffect(() => {
    if (!selectedFile) return;
    Papa.parse(selectedFile, {
      header: true,
      complete: async (results) => {
        const updatedRows = await Promise.all(
          results.data.map(async (row) => {
            const apiResult = await callApiWithRowData(row);
            return {
              ...row,
              Cost: apiResult[0],
              'Purchase Link': apiResult[1],
            };
          })
        );
        // Now `updatedRows` contains the original data plus the new column from the API call
        const updatedCsv = Papa.unparse(updatedRows);
        downloadUpdatedCsv(updatedCsv);
      },
    });
  }, [selectedFile]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

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
          </div>
        </div>
        <input
          type='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept='.csv'
          onChange={handleFileChange}
        />
        <button
          onClick={handleUploadClick}
          className='w-full px-3 py-2 mt-4 text-white bg-black hover:bg-black font-poppins'
        >
          upload csv with departing locations
        </button>

        {/* Table */}
        <div className='mt-6'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Depart Location
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Employee
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Flight Price
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Hotel Price
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Ticket Tier
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {mockData.map((data, index) => (
                <tr key={index}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {data.departLocation}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {data.employee}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {data.flightPrice}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {data.hotelPrice}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
                      {data.ticketTier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end mt-4 space-x-2'>
          <button
            // onClick={handleBookFlights}
            className='px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded'
          >
            Book Flights
          </button>
          <button
            // onClick={handleBookHotels}
            className='px-4 py-2 text-white bg-green-500 hover:bg-green-700 font-semibold rounded'
          >
            Book Hotels
          </button>
        </div>
      </div>
    </div>
  );
}
