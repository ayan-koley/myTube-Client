import React from 'react'
import { useState } from 'react'
import LikeButton from '../LikeButton.jsx';

function VideoInfo({video_id, views = 0, likes=0}) {
  return (
    <div className='w-1/2 flex justify-around items-center text-white'>
        <div>{views} views</div>
        <div>
            <LikeButton likes={likes} _id={video_id} />
        </div>
        <div>
            Playlist
        </div>
    </div>
  )
}

export default VideoInfo