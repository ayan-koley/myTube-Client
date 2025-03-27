import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import VideoCard from '../VideoCard';
import { CircularProgress } from '@mui/material';

function VideoPanel({channelId, value, index}) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchedData = async() => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/v1/user/channel-videos/${channelId}`);
                console.log(response.data.data)

                if(!response) {
                    setError("Failed to fetched data");
                }   else {
                    setVideos(response.data.data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchedData();
    }, [])
  return loading ?  (
    <div className='h-[300px] flex items-center justify-center' hidden={value !== index}>
        <CircularProgress />
    </div>
  ) : (
    <div hidden={value !== index} className=" bg-primary grid lg-2:grid-cols-4 md:grid-cols-3 md-2:grid-cols-2  gap-5 py-10">
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
  )
}

export default VideoPanel