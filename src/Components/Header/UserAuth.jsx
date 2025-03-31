import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { logOut } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function UserAuth() {
  const [error, setError] = useState(null);
  const { status, userData } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const location = useLocation();

  
const handleClick = () => {
  if(status) navigate("/profile");
  else navigate("/login", {state: { from: location}});
}

  return (
      <div onClick={handleClick} className="hidden sm:block cursor-pointer mr-1">
        <Avatar alt="Remy Sharp" src={userData?.avatar?.url}>
        {status ? (
          <img src={userData?.avatar?.url} />
        ) : (
          <CiUser className="text-black font-medium text-2xl" />
        )}
      </Avatar>
      </div>
  );
}

export default UserAuth;
