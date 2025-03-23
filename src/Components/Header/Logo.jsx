import React from "react";
import logo from "../../assets/icon.webp";

function Logo() {
  return (
    <div className="flex">
      <div className="hidden md:block">
        <img src={logo} className="h-8 mr-2 rounded-2xl" />
      </div>
      <div>
        <p>VidXplore</p>
      </div>
    </div>
  );
}

export default Logo;
