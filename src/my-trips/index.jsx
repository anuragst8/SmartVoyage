import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserTripCard from "./components/UserTripCard";

const MyTrips = () => {
  const navigation = useNavigation();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnap = await getDocs(q);
    setUserTrips([]);
    querySnap.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5  bg-gray-900 py-8">
      <h2 className="font-bold text-3xl mb-5 text-white">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {userTrips?.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))
        ) : (
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-xl">
              Awww! No trips yet.
              <br />
              Plan one today!
            </h2>
            <h2 className="text-gray-600">
              Life is too short to avoid a trip!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
