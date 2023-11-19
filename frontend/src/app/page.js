'use client';
import { Navbar } from '../components/Navbar';
// import ChatBox from '@/components/Chatbox';
import BarChart from '@/components/BarChart';
import LaunchPage from './home/page'
import BudgetChart from '@/components/BarChart';



export default function Home() {
  return (
    <div>
       <Navbar />
      <div className="container mx-auto p-6">
      <h3 className="text-2xl mt-11 text-black text-left mb-6 font-bold font-poppins">Your event overview.</h3>


      

      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li class="me-2">
              <a href="#" class="inline-block px-4 py-3 text-white bg-black rounded-lg active" aria-current="page">Overview</a>
          </li>
          <li class="me-2">
              <a href="#"  class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Venue Options</a>
          </li>
          <li class="me-2">
              <a href="#" class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Food Quotes</a>
          </li>
          <li class="me-2">
              <a href="#" class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Registrations</a>
          </li>
          <li class="me-2">
          <a href="#" class="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Activity Quotes</a>
          </li>
      </ul>
      <div className="mt-6 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
    <BudgetChart />
    </div>

      </div>
      <div className="container mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Popular destinations</h2>
        <p className="text-sm text-gray-500">Based on your location in Ann Arbor</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DestinationCard 
          title="Orlando" 
          subtitle="Jan 20 - 27, 2024 Walt Disney World & Universal Studios"
          imageUrl="/placeholder-image-1.png" // Replace with your image path
        />
        <DestinationCard 
          title="Miami" 
          subtitle="Dec 9 - 15 South Beach, art deco & Little Havana"
          imageUrl="/placeholder-image-2.png" // Replace with your image path
        />
        <DestinationCard 
          title="New York" 
          subtitle="Dec 9 - 15 Statue of Liberty, skyscrapers & culture"
          imageUrl="/placeholder-image-3.png" // Replace with your image path
        />
      </div>
    </div> 
    </div>
  );
}


const DestinationCard = ({ title, subtitle, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt="Destination Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{subtitle}</p>
      </div>
    </div>
  );
};