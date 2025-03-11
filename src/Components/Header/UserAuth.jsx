import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { logOut } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function UserAuth() {
  const [authRedirect, setAuthRedirect] = useState("");
  const [isList, setIsList] = useState(false);
  const [error, setError] = useState(null);
  const { status, userData } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    setError(null);
    try {
      const logoutSession = await axios.post("/api/v1/user/logout");
      console.log(logoutSession);
      if (logoutSession) {
        dispatch(logOut());
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };



  useEffect(() => {
    if(status) setAuthRedirect("/profile");
    else setAuthRedirect("/login")
  }, [status, authRedirect])
  


  return (
    <Link to={authRedirect} className="hidden sm:block cursor-pointer mr-1" onClick={() => setIsList(!isList)}>
      <Avatar alt="Remy Sharp" src={userData?.avatar?.url}>
        {status ? (
          <img src={userData?.avatar?.url} />
        ) : (
          <CiUser className="text-black font-medium text-2xl" />
        )}
      </Avatar>
    </Link>
  );
}

export default UserAuth;
