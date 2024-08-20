import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, BudgetOptions, TravelerList } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    country: "",
    days: "",
    budget: "",
    travelers: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBudgetSelect = (budget) => {
    setFormData({ ...formData, budget });
  };

  const handleTravelerSelect = (travelers) => {
    setFormData({ ...formData, travelers });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setOpenDialog(true);
      return;
    }

    generatePromptAndSendMessage();
  };

  const generatePromptAndSendMessage = async () => {
    if (
      formData?.days > 5 ||
      !formData?.budget ||
      !formData?.city ||
      !formData?.country ||
      !formData?.state ||
      !formData?.travelers
    ) {
      toast("Please fill all details.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{city}", formData?.city)
      .replace("{state}", formData?.state)
      .replace("{country}", formData?.country)
      .replace("{budget}", formData?.budget)
      .replace("{days}", formData?.days)
      .replace("{travelers}", formData.travelers);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    saveAITrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        generatePromptAndSendMessage();
      });
  };

  const saveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 py-10 bg-gray-900">
      <h2 className="font-bold text-3xl text-white">Enter your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences
      </p>
      <form onSubmit={handleSubmit} className="mt-14">
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium text-white">
              Enter your destination 🏖️🍹
            </h2>
            <div className="flex gap-3">
              <Input
                placeholder="Enter City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                placeholder="Enter State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <Input
                placeholder="Enter Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium text-white">No. of days</h2>
            <Input
              placeholder="Enter no. of days (Less than 5)"
              name="days"
              type="number"
              value={formData.days}
              onChange={handleChange}
            />
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium text-white">
              What is your budget? <br />
              The budget is exclusively used for dining and activity purposes.
            </h2>
            <div className="pb-4 grid grid-cols-3 gap-5 mt-5">
              {BudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 cursor-pointer border rounded-lg  bg-gradient-to-r from-yellow-200 to-pink-400 hover:shadow-lg  hover:border-4 ${
                    formData.budget === item.title ? "border-black" : ""
                  }`}
                  onClick={() => handleBudgetSelect(item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm ">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium text-white">
              Who do you plan on traveling with on your next adventure?
            </h2>
            <div className="pb-4 grid grid-cols-3 gap-5 mt-5">
              {TravelerList.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:border-4 ${
                    formData.travelers === item.title ? "border-black" : ""
                  }`}
                  onClick={() => handleTravelerSelect(item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm ">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="my-5 justify-end flex">
          <Button type="submit" variant="outline" disabled={loading}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </form>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign In with Google Authentication securely</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
