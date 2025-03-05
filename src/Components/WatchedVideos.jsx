import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card';

function WatchedVideos() {
    const {status} = useSelector(state => state.authSlice);
    const {watchVideos} = useSelector((state) => state.historySlice);
  return watchVideos.length > 0 ? (
    <div>
        <div className='underline text-3xl px-4 py-4'>HISTORY</div>
       {watchVideos[0].map((item) => (
            <div key={item._id} className="px-5 py-5">
            <Card avatar={item.owner.avatar.url} thumbnail={item.thumbnail.url} title={item.title} username={item.owner.username} createdAt={item.createdAt} views={item.views} />
            </div>
       ))}
    </div>
  ) : (
    <div>
        <div className='text-4xl flex mt-10 justify-center'>
            {status ? (<div>
              Watch history is empty
            </div>) : (<div>
              Unauthorized Request
            </div>)}
        </div>
    </div>
  )
}

export default WatchedVideos