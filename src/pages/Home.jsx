import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {VideoCard} from "../Components";
import { Skeleton } from "@mui/material";
import LikeButton from "../Components/LikeButton";
import SubscribedButton from "../Components/SubscribedButton";
import { Link } from "react-router-dom";
function Home() {
  const [videos, setVideos] = useState([]);
  const { searchedVideos, query } = useSelector((state) => state.videoSlice);
  const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8];
  
  useEffect(() => {
    if(searchedVideos?.[query]) {
      setVideos(searchedVideos[query]);
    }
  }, [searchedVideos, query])

  return !searchedVideos[query] ? (
  <div className="px-5 py-5 flex flex-wrap justify-around">
    {skeletonCount.map((item, index) => (
      
      <div className="mx-3" key={index}>
        <Skeleton height={200} width={320} />
        <Skeleton variant="rectangular" width={310} height={20} className="!mb-2" />
        <div className="flex items-center ">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={200} height={20} className="ml-3" />
        </div>
    </div>
    ) )}
  </div>
) : (
   
    <div className="grid lg-2:grid-cols-4 md:grid-cols-3 md-2:grid-cols-2 mx-auto gap-10 mt-8">
      {videos.map((item) => (
        <div key={item._id} className="flex justify-center mt-5">
          <Link to={`/video/${item._id}`}>
            <VideoCard avatar={item.owner.avatar.url} thumbnail={item.thumbnail.url} title={item.title} username={item.owner.username} createdAt={item.createdAt} views={item.views} />
          </Link>  
        </div>
      ))}
    </div>
  );
}

export default Home;
