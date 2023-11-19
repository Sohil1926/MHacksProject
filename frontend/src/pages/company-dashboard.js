'use client';
import { useRef, useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Navbar } from '../components/Navbar';
import '../app/globals.css';
require('dotenv').config();
const axios = require('axios');

export default function CompanyDashboard() {
  '';
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const getFlightDetails = async (
    fly_from,
    fly_to,
    depart_date,
    return_date,
    limit = 10
  ) => {
    const url = 'https://tequila-api.kiwi.com/v2/search';
    const headers = {
      Accept: 'application/json, text/plain, */*',
      Apikey: process.env.KIWI_API_KEY || 'bMdGm7ez3Tdxti068unZYc2f8QQ6WHxN',
      // Remove "Authorization" if it's not needed. It seems to be a token, and you should never expose it.
    };
    const params = {
      sort: 'price',
      partner_market: 'sg',
      asc: 1,
      fly_from: `airport:${fly_from}`,
      fly_to: `airport:${fly_to}`,
      curr: 'USD',
      adults: 1,
      date_from: depart_date,
      date_to: depart_date,
      one_for_city: 0,
      one_per_date: 0,
      limit: limit,
      max_stopovers: 3,
      offset: 0,
      selected_cabins: 'M',
      return_from: return_date,
      return_to: return_date,
    };

    try {
      const response = await axios.get(url, { headers, params });
      return response.data;
    } catch (error) {
      console.error('Error fetching flight details:', error);
      return null;
    }
  };

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

    /*
    Arrival Airport: "MIA"
    City: "New York"
    Country: "United States"
    Departing Airport: "JFK"
    Employee: "Jeff Angnor"
    State: "New York"
    Ticket Level: "High"
    */

    // const response = await ;
    // console.log(process.env.KIWI_API_KEY);
    const result = await getFlightDetails(
      rowData['Departing Airport'],
      rowData['Arrival Airport'],
      '01/12/2023',
      '15/12/2023'
    );

    return [result?.data[0]?.['price'], result?.data[0]?.['deep_link']];
    // return [result?.data[0]['price'], result?.data[0]['deep_link']]; // Assuming the API returns the new data to be added to the CSV
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
              Cost: apiResult[0] || 'N/A',
              'Purchase Link': apiResult[1] || 'N/A',
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
      </div>
    </div>
  );
}
