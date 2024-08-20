import React from "react";
import DayItinerary from "./DayItinerary";

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip.tripData?.itinerary || {};
  const sortedItinerary = Object.entries(itinerary).sort((a, b) => {
    const dayNumberA = parseInt(a[0].replace("day", ""), 10);
    const dayNumberB = parseInt(b[0].replace("day", ""), 10);
    return dayNumberA - dayNumberB;
  });
  return (
    <div>
      <h2 className="font-bold text-xl">Places to visit</h2>
      <div>
        {sortedItinerary.map(([day, data], index) => (
          <DayItinerary key={index} day={day} data={data} />
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
