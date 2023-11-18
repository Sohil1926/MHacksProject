import React from 'react';

export default function Page() {
  const RestaurantCard = ({ restaurant }) => {
    return (
      <div>
        <h1>{restaurant.name}</h1>
        <h1>{restaurant.phoneNumber}</h1>
        <h1>{restaurant.priceLevel}</h1>
      </div>
    );
  };
  return (
    <>
      <div className='h-full flex flex-col justify-center items-center'>
        <h1>Testing</h1>
      </div>
    </>
  );
}
