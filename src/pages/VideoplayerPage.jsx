import React, { useEffect, useState } from 'react'
import {VideoPlayer, VideoInfo, VideoTitle, VideoDescription, OwnerSection, CommentSection, RecommendVideo} from '../Components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import About from '../Components/About';
import axios from 'axios';


function VideoplayerPage() {
    const {videoId} = useParams();
    const [video, setVideo] = useState({});
    const {query, searchedVideos} = useSelector(state => state.videoSlice);

    useEffect(() => {
      if(Object.keys(video).length === 0 && searchedVideos[query]){
        const videoData = searchedVideos[query].find((item) => item._id === videoId);
        if(videoData) {
          setVideo(videoData);
        }
      }
    }, [video, query, searchedVideos, videoId])
    useEffect(() => {
      console.log("hook is callling");
     updateViews();
    }, [])
    const updateViews = async() => {
      try {
        await axios.patch(`/api/v1/video/watched/${videoId}`);
      } catch (error) {
        console.error(error);
      }
    }
    
  return Object.keys(video).length !== 0 && (
    <div className='w-full flex flex-col md:flex-row justify-between'>
      <div className='w-full md:mx-4 mt-5'>
        {/* <div><VideoPlayer src={video.videoFile.url} /></div> */}
        <div className='p-1'>
          <video src={video.videoFile.url} controls  className='!w-full md:w-1/2' />
        </div>
        <div className='px-4 md:px-0'>
          <OwnerSection src={video.owner.avatar.url} username={video.owner.username} />
        </div>
        <div className='px-4 md:px-0'>
          <About title={video.title} description={video.description} />
        </div>
        <div className='px-4 md:px-0'>
          <CommentSection videoId={videoId} />
        </div>
        {/* <div>
          <VideoTitle title={video.title} />
        </div>
        <div>
          <VideoDescription description={video.description} />
        </div>
        <div>
          <VideoInfo video_id={video._id} />
        </div> */}
      </div>
      <div>
        <RecommendVideo />
      </div>
    </div>
  )
}

export default VideoplayerPage