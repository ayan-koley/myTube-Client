import React from "react";
import { Avatar } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

import { MdPublishedWithChanges } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";

function Card({ thumbnail, username, avatar, title, createdAt, views }) {
  
  const formatViews = (num) => {
    if(num >= 1_000_000) return (num / 1_000_000).toFixed(1)+"M";
    if(num >= 1_000) return (num / 1_000).toFixed(1)+"K";
    return num;
  }
  const formattedTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const new_views = formatViews(views);
  if(title.length > 20) {
    title = title.subString(0, 10); 
  }
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden md:w-72 w-80">
      {/* Video Thumbnail */}
      <img 
        src={thumbnail}
        alt="Video Thumbnail" 
        className="w-full h-35 object-cover" 
      />
      <div className="pl-4">
        {title}
        </div>

      {/* Video Details */}
      <div className="flex p-3 gap-3">
        {/* Avatar */}
        {avatar ? (
          <Avatar alt="Remy Sharp" src=
          {avatar} />
        ) : (
          <Avatar {...stringAvatar(username)} />
        )}
        
        {/* className="w-10 h-10 rounded-full mr-3"  */}

        {/* Video Info */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{username}</span>
          <span className="text-xs text-gray-500">{new_views} views • {formattedTime}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
