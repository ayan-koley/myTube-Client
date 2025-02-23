import React from "react";
import { useSelector } from "react-redux";
import Card from "../Components/Card.jsx";
function Home() {
  const { searchedVideos, query } = useSelector((state) => state.videoSlice);
  
  return !searchedVideos[query] ? (<div className="h-50 justify-center w-full text-2xl md:text-4xl flex items-center mx-auto"><p className="!text-black">Search Video is missing on Database</p></div>) : (
    <div className="flex flex-wrap">
      {searchedVideos?.[query]?.map((item) => (
        <div key={item._id} className="px-5 py-5">
          <Card avatar={item.owner.avatar.url} thumbnail={item.thumbnail.url} title={item.title} username={item.owner.username} createdAt={item.createdAt} views={item.views} />
          </div>
      ))}
    </div>
  );
}

export default Home;
