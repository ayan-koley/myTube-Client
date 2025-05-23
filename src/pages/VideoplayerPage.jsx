import React, { useEffect, useState } from 'react'
import { ChannelHeader, CommentSection, RecommendVideo, About} from '../Components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CircularProgress } from '@mui/material';


function VideoplayerPage() {
    const {videoId} = useParams();
    const [video, setVideo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {status} = useSelector(state => state.authSlice);

    useEffect(() => {
      fetchingVideo();
      updateViews();
      updateHistory();
    }, [videoId])

    
    const updateViews = async() => {
      try {
        await axios.patch(`/api/v1/video/watched/${videoId}`);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchingVideo = async() => {
      setLoading(true);
      try {
        const videoData = await axios.get(`/api/v1/video/getvideo/${videoId}`)
        setVideo(videoData.data.data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    const updateHistory = async() => {
      if(status) {
      try {
        await axios.patch(`/api/v1/user/watch-history/${videoId}`)
      } catch (err) {
        setError(err.message);
      }
      }
    }

    
    loading &&  (
      <div>
        <CircularProgress />
      </div>
    )


  return Object.keys(video).length !== 0 ? (
    <div className='w-full flex flex-col md:flex-row justify-between'>
      <div className='w-full md:w-1/2 md:mx-4 mt-5'>
        <div className='p-1'>
          <video src={video.videoFile.url} controls  className='!w-full md:w-1/2' />
        </div>
        <div className='px-4 md:px-0'>
          <ChannelHeader src={video.owner.avatar.url} _id={video.owner._id} username={video.owner.username} likesCount={video.likes} videoId={video._id}/>
        </div>
        <div className='px-4 md:px-0'>
          <About title={video.title} description={video.description} />
        </div>
        <div className='px-4 md:px-0'>
          <CommentSection videoId={videoId} />
        </div>
      </div>
      <div>
        <RecommendVideo videoId={videoId} />
      </div>
    </div>
  ) : (
    <div className='text-white'>
      {error}
    </div>
  )
}

export default VideoplayerPage