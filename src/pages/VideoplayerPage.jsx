import React, { useEffect, useState } from 'react'
import {VideoPlayer, VideoInfo, VideoTitle, VideoDescription, OwnerSection} from '../Components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';


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
   console.log(video);
  return Object.keys(video).length !== 0 && (
    <div className='mx-4 my-5 h-screen'>
        {/* <div><VideoPlayer src={video.videoFile.url} /></div> */}
        <div className='p-3'><video src={video.videoFile.url} controls  className='w-1/2' /></div>
        <div>
          <VideoTitle title={video.title} />
        </div>
        <div>
          <VideoDescription description={video.description} />
        </div>
        <div>
          <VideoInfo video_id={video._id} />
        </div>
    </div>
  )
}

export default VideoplayerPage