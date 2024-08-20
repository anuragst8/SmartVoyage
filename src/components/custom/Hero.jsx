import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center gap-20 px-56 py-8 bg-[url('/cover3.jpg')] bg-cover">
      <div className="py-8 ">
      <h1 className="font-extrabold text-[60px] text-center mt-10 text-white">
        <span className="text-[#c72216]">Journeywiz</span> <br /> Discover, Plan, and Experience the Perfect Trip
      </h1>
      </div>
      <p className="text-xl text-gray-500 text-center text-white">
      Start Your Adventure with Journeywiz Today
      Embark on your next adventure with confidence and ease. Join the Journeywiz community and let our AI trip planner turn your travel dreams into unforgettable experiences.
      </p>
      <Link to={"/create-trip"}>
        <Button variant="outline">Plan Your Trip</Button>
      </Link>
      
    </div>
  );
}

export default Hero;
