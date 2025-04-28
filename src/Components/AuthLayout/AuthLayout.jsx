import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {Toaster} from "react-hot-toast";

function AuthLayout({ children, authenticationRequired = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.authSlice);
  const location = useLocation();

  useEffect(() => {
    if (authenticationRequired && status !== authenticationRequired) {
      navigate("/login", {state: {from: location}});
    }
    setLoading(false);
  }, [authenticationRequired, navigate, status]);

  return loading ? (
    <div className="flex w-full justify-center items-center">
      <CircularProgress size="5rem" />
    </div>
  ) : (
    <div>
      <Toaster
      position="top-center"
      />
      {children}
      </div>
  );
}

export default AuthLayout;
