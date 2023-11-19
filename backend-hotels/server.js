const express = require('express');
const { getHotelOffers } = require('./hotelScraper');
const app = express();
const PORT = 8000;

app.use('/get_hotel', async (req, res) => {
  try {
    const response = await getHotelOffers('MIA');
    res.send(response);
  } catch (Error) {
    console.log(Error);
    res.send(Error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
