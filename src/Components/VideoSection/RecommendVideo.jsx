import React, { useEffect, useState } from 'react'
import {VideoCard} from '../index'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function RecommendVideo({videoId}) {
  const [videos, setVideos] = useState([]);
    const { searchedVideos, query } = useSelector((state) => state.videoSlice);

    useEffect(() => {
      setVideos(searchedVideos[query]);
    }, [])

  return (
    <div className='border-gray-400 border-2 rounded-2xl p-10 m-5'>
        <div>
            <div className='underline text-gray-300 font-bold text-2xl p-5'>Similar Type Videos</div>
        </div>
        {videos?.map((item) => (
         item._id !== videoId &&
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
  )
}

export default RecommendVideo