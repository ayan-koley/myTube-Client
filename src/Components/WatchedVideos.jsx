import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {VideoCard} from './index'
import { Link } from 'react-router-dom';

function WatchedVideos() {
    const {watchVideos} = useSelector((state) => state.historySlice);

  return watchVideos.length > 0 ? (
    <div>
        <div className='underline text-white text-center text-3xl px-4 py-4'>HISTORY</div>
       <div className="grid lg-2:grid-cols-4 md:grid-cols-3 md-2:grid-cols-2 mx-auto gap-10 mt-8">
       {watchVideos[0].map((item) => (
            <div key={item._id} className="px-5 py-5">
              <Link to={`/video/${item._id}`}>
                <VideoCard avatar={item.owner.avatar.url} thumbnail={item.thumbnail.url} title={item.title} username={item.owner.username} createdAt={item.createdAt} views={item.views} />
              </Link>
            </div>
            
       ))}
       </div>
    </div>
  ) : (
    <div>
        <div className='text-4xl flex mt-10 justify-center'><div>
          Watch history is empty
        </div>
      </div>
    </div>
  )
}

export default WatchedVideos