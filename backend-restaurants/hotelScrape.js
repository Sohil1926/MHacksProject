const axios = require('axios');

const amadeusEndpoints = {
  auth: 'https://test.api.amadeus.com/v1/security/oauth2/token',
  hotelList: 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city',
  hotelSearch: 'https://test.api.amadeus.com/v3/shopping/hotel-offers'
};

const apiCredentials = {
  clientId: 'kRlkme34i5bknFNOXkIvzsscncUh62qG',
  clientSecret: '0ouQtKPk37XlShyE'
};

// Function to authenticate and get an access token
async function getAccessToken(clientId, clientSecret) {
    try {
      const response = await axios({
        method: 'post',
        url: amadeusEndpoints.auth,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: `grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error.response.data);
      return null;
    }
  }

// Function to search for hotels
async function searchHotels(accessToken, latitude, longitude, checkInDate, checkOutDate) {
  try {
    const response = await axios.get(amadeusEndpoints.hotelSearch, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        hotelIds: ["MCLONGHM"],
        
        checkInDate,
        checkOutDate,
        sort: 'PRICE' // Sorting by price
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for hotels:', error.response.data);
    return null;
  }
}

(async () => {
  const accessToken = await getAccessToken(apiCredentials.clientId, apiCredentials.clientSecret);
  if (accessToken) {
    const hotelsData = await searchHotels(
      accessToken,
      '44.3148', // Latitude of Paris, example
      '85.6024',  // Longitude of Paris, example
      '2023-12-01', // Check-in date, example
      '2023-12-10'  // Check-out date, example
    );
    
    if (hotelsData) {
      // Log the first 5 cheapest hotels
      hotelsData.data.slice(0, 5).forEach(hotel => {
        console.log(`${hotel.hotel.name}: ${hotel.offers[0].price.total}`);
      });
    }
  }
})();
