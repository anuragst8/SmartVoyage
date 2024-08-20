import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  return (
    <div className="bg-white px-4 py-4 rounded-lg">
      <img
        src="/banner.png"
        className="w-full h-[340px] object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl ">
            {trip?.userSelection?.city}, {trip?.userSelection?.state},{" "}
            {trip?.userSelection?.country}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 font-semibold rounded-full  text-xs md:text-md bg-gray-500">
              {trip.userSelection?.days} days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 font-semibold rounded-full  text-xs md:text-md bg-gray-500">
              {trip.userSelection?.budget} budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 font-semibold rounded-full  text-xs md:text-md bg-gray-500">
              {trip.userSelection?.travelers} trip
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
