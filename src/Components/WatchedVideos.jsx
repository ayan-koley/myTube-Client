import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {VideoCard} from './index'
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {removeVideo} from '../store/historySlice.js';

function WatchedVideos() {
    const {watchVideos} = useSelector((state) => state.historySlice);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const removeFromHistory = async(videoId) => {
      setLoading(true);
      setError(null);
      try {
        await axios.patch(`/api/v1/user/watch-history/remove/${videoId}`);
        dispatch(removeVideo(videoId));
        // navigate("/watch-history")
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  return watchVideos.length > 0 ? (
    <div>
        <div className='underline text-white text-center text-3xl px-4 py-4'>HISTORY</div>
       <div className="grid lg-2:grid-cols-4 md:grid-cols-3 md-2:grid-cols-2 mx-auto gap-10 mt-8">
       {watchVideos.map((item) => (
            <div key={item._id} className="px-5 py-5">
              <Link to={`/video/${item._id}`}>
                <VideoCard avatar={item.owner.avatar.url} thumbnail={item.thumbnail.url} title={item.title} username={item.owner.username} createdAt={item.createdAt} views={item.views} />
              </Link>
              <div>
                <IconButton aria-label="delete" className='relative left-70 -top-16' onClick={() => removeFromHistory(item._id)} >
                  <DeleteIcon className='text-white' />
                </IconButton>
              </div>
            </div>
            
       ))}
       </div>
    </div>
  ) : (
    <div>
      <div className='h-screen text-4xl flex mt-10 justify-center items-center !text-white'>
        <div>
          Watch history is empty
        </div>
      </div>
    </div>
  )
}

export default WatchedVideos