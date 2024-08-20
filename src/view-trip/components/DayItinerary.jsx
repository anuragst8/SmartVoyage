import React from "react";

const DayItinerary = ({ day, data }) => {
  return (
    <div className="my-4 p-4  rounded-lg bg-white">
      <h2 className="font-bold text-xl">{day.replace("day", "Day ")}</h2>
      <p className="italic text-orange-600 ">
        Best time to visit: {data.bestTimeToVisit}
      </p>
      <div className="mt-4">
        {data.plan.map((place, index) => (
          <div key={index} className="my-2 p-2 border-b-2 border-black">
            <h3 className="font-semibold text-xl">{place.placeName}</h3>
            <p>{place.placeDetails}</p>
            <p>Rating: {place.rating}</p>
            <p>Ticket Pricing: {place.ticketPricing}</p>
            <p>Time to Travel: {place.timeToTravel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayItinerary;
