import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchedHistory } from '../store/historySlice';
import WatchedVideos from '../Components/WatchedVideos';

function HistoryPage() {
    const dispatch = useDispatch();
        useEffect(() => {
            dispatch(fetchedHistory());
        }, [])
  return (
    <div className='bg-primary'>
        <WatchedVideos />
    </div>
  )
}

export default HistoryPage