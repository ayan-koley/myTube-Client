import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SubscribedButton({ _id, count }) {
  // const {subscriber} = useSelector(state => state.subscriberSlice);
  // const state = subscriber.has(_id);
  let state = true;
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
    toggleSubscribers();
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
    setIsSubscribed(!isSubscribed);
  }

  return (
    <div>
      {error && <p className="bg-red-500">{error}</p>}
      <Button
        variant="contained"
        color={`${isSubscribed ? "success" : "error"}`}
        sx={{ width: "120px" }}
        onClick={() => hadleIsSubscribedState}
      >
        {isSubscribed ? "Unsubscribe" : "Subscribe"} {subscriberCount}
      </Button>
    </div>
  );
}

export default SubscribedButton;
