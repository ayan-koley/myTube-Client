import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import toast, {Toaster} from "react-hot-toast";

function AuthLayout({ children, authenticationRequired = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (authenticationRequired && status !== authenticationRequired) {
      navigate("/login");
    }
    setLoading(false);
  }, [authenticationRequired, navigate, status]);

  return loading ? (
    <div className="flex h-screen w-full justify-center items-center">
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
