import React, { useState } from 'react';
import '../app/globals.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ChatBox from '@/components/Chatbox';

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
      const {
        formatted_phone_number: phoneNumber,
        price_level: priceLevel,
        rating,
        photos,
      } = detailsResponse.data.result;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${apiKey}`;

      restaurantData.push({
        name: restaurant.name,
        phoneNumber,
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
      <div className='border rounded-lg p-3 w-[400px]'>
        <div style={{ width: '200px', height: '200px', position: 'relative' }}>
          <Image
            src={restaurant.photo}
            className='rounded-lg'
            alt={restaurant.name + ' image'}
            layout='fill' // This makes the image fill the container
            objectFit='cover' // This crops the image to cover the area
            objectPosition='center' // This centers the image within the area
          />
        </div>
        <b className='my-2 text-xl'>{restaurant.name} </b>
        <h1>Phone Number: {restaurant.phoneNumber}</h1>
        <h1>
          Email:{' '}
          {restaurant.name
            .replace(/ /g, '')
            .replace(/[^a-zA-Z0-9]/g, '')
            .toLowerCase() + '@gmail.com'}
        </h1>
        <h1>Price Level: {restaurant.priceLevel}</h1>
        <h1>
          Currently Negotiated Value:{' '}
          {negPrices[restaurant.name]
            ? `\$${negPrices[restaurant.name]} per person`
            : 'Not yet negotiated'}
        </h1>
        <h1>Rating: {restaurant.rating}</h1>

        <div className='flex justify-between mt-5 items-center'>
          <button
            className='rounded mt-2 bg-slate-600 text-white p-3 mr-4'
            onClick={copyNegotiateEmail}
          >
            Negotiate
          </button>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Set Value'
            className='border rounded-full py-2 px-2 mr-2 flex-grow focus:outline-none focus:ring text-black'
          />
          <button
            className='rounded-xl mt-2 bg-red-600 text-white p-3'
            onClick={storeNegValue}
          >
            Set
          </button>
        </div>
        {openChatBox && (
          <ChatBox defaultMsg={defaultChatMsg} closeControl={setOpenChatBox} />
        )}
      </div>
    );
  };
  return (
    <>
      <div className='h-full flex flex-col justify-center items-center bg-white text-black'>
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
        </div>
        <div className='grid grid-cols-3 gap-5 p-3'>
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
