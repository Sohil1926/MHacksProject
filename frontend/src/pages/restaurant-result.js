import React from 'react';
import '../app/globals.css';
import { useRouter } from 'next/router';

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
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.place_id}&fields=formatted_phone_number,price_level&key=${apiKey}`;
      const detailsResponse = await axios.get(detailsUrl);
      const { formatted_phone_number: phoneNumber, price_level: priceLevel } =
        detailsResponse.data.result;
      restaurantData.push({
        name: restaurant.name,
        phoneNumber,
        priceLevel: priceLevel || 'N/A',
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
  const RestaurantCard = ({ restaurant }) => {
    const copyNegotiateEmail = () => {
      const text = `Hello ${restaurant.name}, Please give me free food for 500 people! Best Regards`;
      const type = 'text/plain';
      const blob = new Blob([text], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(data).then(() => alert('Copied to clipboard!'));
    };
    return (
      <div className='border rounded-lg p-3 w-[400px]'>
        <h1>Name: {restaurant.name}</h1>
        <h1>Phone Number: {restaurant.phoneNumber}</h1>
        <h1>
          Email:{' '}
          {restaurant.name
            .replace(/ /g, '')
            .replace(/[^a-zA-Z0-9]/g, '')
            .toLowerCase() + '@gmail.com'}
        </h1>
        <h1>Price Level: {restaurant.priceLevel}</h1>
        <button
          className='rounded mt-2 bg-slate-600 text-white p-3'
          onClick={copyNegotiateEmail}
        >
          Negotiate
        </button>
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
