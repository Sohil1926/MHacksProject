import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

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

  const RestaurantCard = ({ restaurant }) => {
    const copyNegotiateEmail = () => {
      const text = `Hello ${restaurant.name}, Please give me free food for 500 people! Best Regards`;
      const type = 'text/plain';
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(data).then(() => alert('Copied to clipboard!'));
    };
    const [inputValue, setInputValue] = React.useState(''); // [restaurant.name
    const storeNegValue = () => {
      // check if inputValue is a number
      if (isNaN(inputValue)) {
        alert('Please enter a number!');
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
      </div>
    );
  };
  return (
    <>
      <div className='h-full flex flex-col justify-center items-center bg-white text-black'>
        <div className='grid grid-cols-3 gap-5 p-3'>
          {restaurantData?.map((restaurant, i) => (
            <RestaurantCard key={i} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
}
