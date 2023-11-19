'use client';
import { useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import '../app/globals.css';

export default function CompanyDashboard() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Process the file or update the state as needed
    }
  };

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
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".csv"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUploadClick}
          className='w-full px-3 py-2 mt-4 text-white bg-black hover:bg-black font-poppins'
        >
          upload csv with departing locations
        </button>
      </div>
    </div>
  );
}
