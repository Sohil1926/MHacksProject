import axios from 'axios';

const amadeusEndpoints = {
  auth: 'https://test.api.amadeus.com/v1/security/oauth2/token',
  hotelList:
    'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city',
  hotelSearch: 'https://test.api.amadeus.com/v3/shopping/hotel-offers',
};

const apiCredentials = {
  clientId: 'kRlkme34i5bknFNOXkIvzsscncUh62qG',
  clientSecret: '0ouQtKPk37XlShyE',
};

// Function to authenticate and get an access token
async function getAccessToken(clientId, clientSecret) {
  try {
    const response = await axios({
      method: 'post',
      url: amadeusEndpoints.auth,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `grant_type=client_credentials&client_id=${encodeURIComponent(
        clientId
      )}&client_secret=${encodeURIComponent(clientSecret)}`,
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response.data);
    return null;
  }
}

async function getHotelList(accessToken, cityCode) {
  try {
    const response = await axios.get(amadeusEndpoints.hotelList, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        cityCode,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching hotel list:',
      error.response ? error.response.data : error
    );
    return null;
  }
}

async function getHotelOffersById(accessToken, hotelId) {
  try {
    // console.log(`${amadeusEndpoints.hotelSearch}?hotelIds=[${hotelId}]`);
    const response = await axios.get(
      `${amadeusEndpoints.hotelSearch}?hotelIds=[${hotelId}]`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      'Error fetching hotel offers:',
      error.response ? error.response.data : error
    );
    return null;
  }
}
async function getHotelOffers(cityCode = 'MIA') {
  const accessToken = await getAccessToken(
    apiCredentials.clientId,
    apiCredentials.clientSecret
  );
  if (accessToken) {
    const hotelListData = await getHotelList(accessToken, cityCode);

    if (hotelListData) {
      const allOffers = [];
      for (const hotel of hotelListData.data) {
        const hotelOffersData = await getHotelOffersById(
          accessToken,
          hotel.hotelId
        );
        // console.log(
        //   hotelOffersData?.data[0]?.offers[0]?.price ||
        //     'No price information available'
        // );

        // console.log(hotelOffersData?.data[0]?.offers[0]?.price);
        allOffers.push(hotelOffersData?.data[0]?.offers[0]?.price || null);
        //   if (hotelOffersData) {
        //     console.log(hotelListData);
        //     // console.log(`${hotel.name}: ${hotelOffersData.offers[0].price.total}`);
        //   }
      }
      return allOffers;
    }
    return [];
  }
}

export { getHotelOffers };
