'use client';
import { Navbar } from '../../components/Navbar';

import img from '../../assets/test.png';
import Image from 'next/image';

export default function Overview() {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto p-6'>
        <h3 className='text-2xl mt-11 text-black text-left mb-6 font-bold font-poppins'>
          Your event overview.
        </h3>
        <Image src={img} alt="Description of the image" width={500} height={500}/>


        
      </div>
    </div>
  );
}
