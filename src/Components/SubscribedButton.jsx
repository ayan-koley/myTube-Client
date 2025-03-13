import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SubscribedButton({ _id, count }) {
  // const {subscriber} = useSelector(state => state.subscriberSlice);
  // const state = subscriber.has(_id);
  let state = false;
  const navigate = useNavigate();

  const [subscriberCount, setSubsCriberCount] = useState(count);
  const [isSubscribed, setIsSubscribed] = useState(state);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(isSubscribed);
    if (state) {
      if (!isSubscribed) {
        setSubsCriberCount(subscriberCount-1);
      } else {
        if (subscriberCount < count) {
          setSubsCriberCount(subscriberCount+1);
        } else {
          setSubsCriberCount(count);
        }
      }
    } else {
      if (isSubscribed) {
        setSubsCriberCount(subscriberCount+1);
      } else {
        if (subscriberCount > count) {
          setSubsCriberCount(subscriberCount-1);
        } else {
          setSubsCriberCount(count);
        }
      }
    }
    // toggleSubscribers();
  }, [isSubscribed]);

  const toggleSubscribers = async() => {
    try {
      const response = await axios.post(`/api/v1/subscription/${_id}`);
      if(!response) {
        setError("Unauthorized or channel finding failed");
      }
    } catch (err) {
      setError(err.message);
    }
  }
  const hadleIsSubscribedState = () => {
    console.log("click on isSubscribed");
    setIsSubscribed(!isSubscribed);
  }


  return (
    <div className="flex items-center">
      {error && <p className="bg-red-500">{error}</p>}
      <div className="text-white mx-2">
        {subscriberCount}
      </div>
      <Button
        variant="contained"
        color={`${isSubscribed ? "success" : "error"}`}
        onClick={hadleIsSubscribedState}
        sx={{width: '126px'}}
      >
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </Button>
    </div>
  );
}

export default SubscribedButton;
