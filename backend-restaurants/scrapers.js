require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.GOOGLE_API_KEY;
const location = '42.29190150805537, -83.71369867218539'; // Use the lat,long of your desired location
const radius = 1500; // Search within this radius in meters
const type = 'restaurant';
const keyword = 'restaurant';
console.log(apiKey);
const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`;

const getNearbyRestaurants = async () => {
  try {
    const response = await axios.get(googlePlacesUrl);
    // console.log(response);
    const restaurants = response.data.results;

    for (const restaurant of restaurants) {
      // Now we have to fetch the details for each place to get the phone number
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.place_id}&fields=formatted_phone_number&key=${apiKey}`;
      const detailsResponse = await axios.get(detailsUrl);
      const phoneNumber = detailsResponse.data.result.formatted_phone_number;

      console.log(`Name: ${restaurant.name}`);
      console.log(`Phone Number: ${phoneNumber}\n`);
    }
  } catch (error) {
    console.error('Error fetching nearby restaurants:', error);
  }
};

getNearbyRestaurants();
