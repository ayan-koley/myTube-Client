import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function MobileHeaderOptions() {
  const { status } = useSelector((state) => state.authSlice);
  const options = [
    {
      name: "History",
      to: "/watch-history",
      view: true,
    },
    {
      name: "Upload Video",
      to: "/upload-video",
      view: true,
    },
    {
      name: "Dashboard",
      to: "/dashboard",
      view: true,
    },
    {
      name: "Login",
      to: "/login",
      view: !status,
    },
    {
      name: "Sign Up",
      to: "/sign-up",
      view: !status,
    },
    {
      name: "Profile",
      to: "/profile",
      view: status,
    },
  ];
  return (
    <div>
      {options.map(
        (item, index) =>
          item.view && (
            <Link
              to={item.to}
              key={index}
              className="text-gray-400 hover:text-gray-300"
            >
              <ListItem>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          )
      )}
    </div>
  );
}

export default MobileHeaderOptions;
