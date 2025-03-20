import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import VideoCard from '../VideoCard';
import { Link } from 'react-router-dom';

function SearchedVideo() {
    const { searchedVideos, query } = useSelector((state) => state.videoSlice);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos(searchedVideos[query]);
    }, [searchedVideos, query])

  return videos && videos.length > 0 ? (
    <div className="grid lg-2:grid-cols-4 md:grid-cols-3 md-2:grid-cols-2 mx-auto gap-10 mt-8">
      {videos.map((item) => (
        <div key={item._id} className="flex justify-center mt-5">
          <Link to={`/video/${item._id}`}>
            <VideoCard
              avatar={item.owner.avatar.url}
              thumbnail={item.thumbnail.url}
              title={item.title}
              username={item.owner.username}
              createdAt={item.createdAt}
              views={item.views}
            />
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div className='h-screen w-full flex items-center justify-center !text-white text-3xl px-3'>
        <p>'{query}' text is missing from the title & desciption of any video </p>
    </div>
  )
}

export default SearchedVideo