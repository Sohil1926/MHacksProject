import React from 'react';
import '../app/globals.css';

require('dotenv').config();
const axios = require('axios');

export async function getServerSideProps() {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const location = '42.29190150805537, -83.71369867218539'; // Use the lat,long of your desired location
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
    return (
      <div className='border rounded p-3 w-[400px]'>
        <h1>Name: {restaurant.name}</h1>
        <h1>Phone Number: {restaurant.phoneNumber}</h1>
        <h1>Price Level: {restaurant.priceLevel}</h1>
      </div>
    );
  };
  return (
    <>
      <div className='h-full flex flex-col justify-center items-center'>
        <div className='grid grid-cols-3 gap-5 p-3'>
          {restaurantData.map((restaurant, i) => (
            <RestaurantCard key={i} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </>
  );
}
