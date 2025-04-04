import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SubscribedButton({username, _id, count=0 }) {
  const {status} = useSelector(state => state.authSlice);
  const navigate = useNavigate();

  const [subscriberCount, setSubsCriberCount] = useState(count);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

    useEffect(() => {
      const fetchSubscribedStatus = async() => {
        try {
          const response = await axios.get(`/api/v1/subscription/status/${_id}`)
          setIsSubscribed(response.data.data.isSubscribed);
        } catch (err) {
          setError(err.message);
        }
      }
      if(status) fetchSubscribedStatus();
    },[])

  const toggleSubscribers = async() => {
    if(!status) navigate("/login", {state: {from: location}});
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/v1/subscription/${_id}`);
      if(response.data.message.includes('create')) {
        toast.success(`You have subscribed to ${username}.`);
        setSubsCriberCount(prev => prev + 1);
        setIsSubscribed(true);
      } else {
        toast.success(`You have Unsubscribed from ${username}.`);
        setSubsCriberCount(prev => prev - 1);
        setIsSubscribed(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center">
      {error && <p className="bg-red-500">{error}</p>}
      {/* <div className="text-white mx-2">
        {subscriberCount}
      </div> */}
      <Button
        loading={loading}
        disabled={loading}
        variant="contained"
        color={`${isSubscribed ? "success" : "error"}`}
        onClick={toggleSubscribers}
        sx={{width: '126px'}}
      >
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </Button>
    </div>
  );
}

export default SubscribedButton;
