import React from "react";

const Hotels = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 text-white">Hotel Recommendations</h2>
      <div className="flex flex-col gap-4 p-5">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <div className="flex gap-10 bg-white px-4 rounded-lg">
            <img src="/luxury-hotel.jpg" className="rounded-xl h-[100px] mt-2" />
            <div className="my-2 flex flex-col gap-2">
              <h2 className="font-medium">{hotel?.hotelName}</h2>
              <h2 className="text-xs text-gray-500">{hotel?.hotelAddress}</h2>
              <h2 className="text-sm">{hotel?.price}</h2>
              <h2 className="text-sm">{hotel?.rating} ⭐</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
