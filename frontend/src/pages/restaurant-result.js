import React, { useState } from 'react';
import '../app/globals.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ChatBox from '@/components/Chatbox';
import Link from 'next/link';

require('dotenv').config();
const axios = require('axios');

export async function getServerSideProps({ query }) {
  try {
    // const router = useRouter();
    // const { query } = router;
    const { lat, long } = query;
    // console.log(lat, long);

    const apiKey = process.env.GOOGLE_API_KEY;
    // const location = `42.29190150805537, -83.71369867218539`; // Use the lat,long of your desired location
    const location = `${lat}, ${long}`; // Use the lat,long of your desired location

    const radius = 1500; // Search within this radius in meters
    const type = 'restaurant';
    const keyword = 'restaurant';
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`;
    const response = await axios.get(googlePlacesUrl);
    // console.log(response);
    const restaurants = response.data.results;
    const limit = 20;
    const restaurantData = [];
    for (const restaurant of restaurants.slice(0, limit)) {
      // Fetch the details for each place to get the phone number and price level
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.place_id}&fields=formatted_phone_number,price_level,rating,photos&key=${apiKey}`;
      const detailsResponse = await axios.get(detailsUrl);
      if (detailsResponse.data.result === undefined) continue;
      const {
        formatted_phone_number: phoneNumber,
        price_level: priceLevel,
        rating,
        photos,
      } = detailsResponse.data.result;
      const photoUrl =
        photos && photos[0].photo_reference
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${apiKey}`
          : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg';

      restaurantData.push({
        name: restaurant?.name || 'NA',
        phoneNumber: phoneNumber || 'N/A',
        priceLevel: priceLevel || 'N/A',
        rating: rating || 'N/A',
        photo: photoUrl,
      });
    }
    return { props: { restaurantData } };
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
    return { props: {} };
  }
}
export default function Page({ restaurantData }) {
  // console.log(restaurantData);
  const router = useRouter();
  const { query } = router;
  const [negPrices, setNegPrices] = React.useState({}); // { restaurantName: price } (Per person)
  const [openChatBox, setOpenChatBox] = React.useState(false);
  const [defaultChatMsg, setDefaultChatMsg] = React.useState('');
  const [sortOption, setSortOption] = useState('default');
  const [sortedRestaurantData, setSortedRestaurantData] =
    useState(restaurantData);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);

    switch (event.target.value) {
      case 'rating_high_low':
        setSortedRestaurantData(
          restaurantData.sort((a, b) => b.rating - a.rating)
        );
        break;
      case 'rating_low_high':
        setSortedRestaurantData(
          restaurantData.sort((a, b) => a.rating - b.rating)
        );
        break;
      case 'price_high_low':
        setSortedRestaurantData(
          restaurantData.sort((a, b) => b.priceLevel - a.priceLevel)
        );
        break;
      case 'price_low_high':
        setSortedRestaurantData(
          restaurantData.sort((a, b) => a.priceLevel - b.priceLevel)
        );
        break;
      case 'negotiated_high_low':
        setSortedRestaurantData(
          restaurantData.sort((a, b) => negPrices[b.name] - negPrices[a.name])
        );
        break;
      case 'negotiated_low_high':
        setSortedRestaurantData(
          restaurantData.sort((a, b) => negPrices[a.name] - negPrices[b.name])
        );
        break;
      default:
        setSortedRestaurantData(restaurantData);
        break;
    }

    // Handle the sorting logic here or pass the sortOption to a parent component
  };
  const RestaurantCard = ({ restaurant }) => {
    const copyNegotiateEmail = () => {
      const text = `Hello ${restaurant.name}, Please give me free food for 500 people! Best Regards`;
      setDefaultChatMsg(text);
      setOpenChatBox(true);

      // const type = 'text/plain';
      // const blob = new Blob([text], { type });
      // const data = [new ClipboardItem({ [type]: blob })];
      // navigator.clipboard.write(data).then(() => alert('Copied to clipboard!'));
    };
    const [inputValue, setInputValue] = React.useState(''); // [restaurant.name
    const storeNegValue = () => {
      // check if inputValue is a number
      if (isNaN(inputValue)) {
        alert('Please enter a number!');
        return;
      }
      if (+inputValue > negPrices[restaurant.name]) {
        alert('You need to learn how to negotiate better!');
        return;
      }
      setNegPrices({ ...negPrices, [restaurant.name]: +inputValue });
    };
    return (
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
        <div className='md:flex'>
          <div className='md:shrink-0'>
            <Image
              src={restaurant.photo}
              alt={`${restaurant.name} image`}
              width={384} // Adjust the size accordingly
              height={256} // Adjust the size accordingly
              className='object-cover md:w-full'
            />
          </div>
          <div className='p-8'>
            <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>{restaurant.name}</div>
            <p className='mt-2 text-gray-500'>Phone: {restaurant.phoneNumber}</p>
            <p className='text-gray-500'>Email: {restaurant.name+"@gmail.com"}</p>
            <p className='text-gray-500'>Price Level: {restaurant.priceLevel}</p>
            <p className='text-gray-500'>Rating: {restaurant.rating}</p>
            <p className='text-gray-500'>Negotiated Value: {negPrices[restaurant.name] ? `$${negPrices[restaurant.name]} per person` : 'Not yet negotiated'}</p>
            <div className='flex mt-4 space-x-3 md:mt-6'>
              <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Set Value'
                className='border border-gray-300 p-2 rounded-lg'
              />
              <button
                className='px-4 py-2 text-white bg-blue-500 rounded-lg shadow'
                onClick={storeNegValue}
              >
                Set
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className='h-full flex flex-col justify-center items-center bg-white text-black'>
        <div className='flex justify-around items-center relative w-full'>
          <Link
            href='/'
            className='bg-primary-gray rounded text-white px-2 left-0'
          >
            Go Back to Dashboard
          </Link>
          <h1 className='text-xl my-4 text-center'>
            All food providers near{' '}
            <span className='bg-primary-gray text-white rounded-lg p-2'>
              {query.selectedVenue || 'NA'}
            </span>
          </h1>
        </div>

        <div className='relative self-stretch mx-5'>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value='default'>Default</option>
            <option value='rating_high_low'>Rating (high to low)</option>
            <option value='rating_low_high'>Rating (low to high)</option>
            <option value='price_high_low'>Price (high to low)</option>
            <option value='price_low_high'>Price (low to high)</option>
            <option value='negotiated_high_low'>
              Negotiated Price (high to low)
            </option>
            <option value='negotiated_low_high'>
              Negotiated Price (low to high)
            </option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.576 4.307c-0.268 0.272-0.701 0.349-1.076 0l-4.576-4.307c-0.408-0.418-0.436-1.17 0-1.615z' />
            </svg>
          </div>
          <button   className='mt-5 bg-black rounded-md text-white px-4 py-2 transition duration-300 ease-in-out transform hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black'
>negotiate</button>

        </div>

        <div className='grid grid-cols-3 border w-full gap-y-5 gap-x- p-3 flex-wrap'>
          {sortOption === 'default' &&
            restaurantData?.map((restaurant, i) => (
              <RestaurantCard key={i} restaurant={restaurant} />
            ))}
          {sortOption !== 'default' &&
            sortedRestaurantData?.map((restaurant, i) => (
              <RestaurantCard key={i} restaurant={restaurant} />
            ))}
        </div>
      </div>
    </>
  );
}
