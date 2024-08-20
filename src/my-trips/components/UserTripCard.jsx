import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  return (
    <div className="border rounded-lg bg-white">
      <h2 className="font-bold text-lg p-5 pb-3">
        {trip.userSelection?.city}, {trip.userSelection?.state},{" "}
        {trip.userSelection?.country}
      </h2>
      <div className="flex flex-col pl-5 pb-5">
        <h2>{trip.userSelection?.days} Days</h2>
        <h2>
          {trip.userSelection?.budget} {trip.userSelection?.travelers} Trip
        </h2>
      </div>
      <Link to={"/view-trip/" + trip.id}>
        <Button variant="outline" className="ml-5 mb-3 text-red-700">
          Show Itinerary
        </Button>
      </Link>
    </div>
  );
};

export default UserTripCard;
