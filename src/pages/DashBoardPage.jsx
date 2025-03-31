import React, { useEffect, useState } from 'react'
import {Dashboard} from '../Components'
import { VideoLibrary, Visibility, People, Favorite } from "@mui/icons-material";
import axios from 'axios';

function DashBoardPage() {
  const[videosCount, setVideosCount] = useState(0);
  const[viewsCount, setViewsCount] = useState(0);
  const[likesCount, setLikesCount] = useState(0);
  const[subscribersCount, setSubscribersCount] = useState(0);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(null);

  const dashboardBackendCall = async() => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/dashboard/status");
      if(response) {
        setVideosCount(response.data?.message[0].totalVideos);
        setViewsCount(response.data?.message[0].totalViews);
        setLikesCount(response.data?.message[0].totalLikes);
        setSubscribersCount(response.data?.message[0].totalSubscriber);
      } else {
        setError("Internal Server Error ::: ");
      }
      setLoading(false)
    } catch (error) {
      setError("Unauthorized Request");
    }
  }

  useEffect(()=> {
    dashboardBackendCall();
  }, [])
  return error ? (
    <div className='text-4xl text-red-500 flex justify-center mt-10 underline'>{error}</div>
  ) : (
    
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Dashboard value={videosCount} icon={<VideoLibrary fontSize="large" />} title={'Total Videos'} color={'bg-blue-500'} />
        <Dashboard value={viewsCount} icon={<Visibility fontSize="large" />} title={'Total Views'} color={'bg-blue-500'} />
        <Dashboard value={subscribersCount} icon={<People fontSize="large" />} title={'Total Subscriber'} color={'bg-blue-500'} />
        <Dashboard value={likesCount} icon={<Favorite fontSize="large" />} title={'Total Likes'} color={'bg-blue-500'} />
    </div>
  )
}

export default DashBoardPage