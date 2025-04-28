import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchedHistory } from '../store/historySlice';
import { WatchedVideos } from '../Components';

function HistoryPage() {
    const dispatch = useDispatch();
        useEffect(() => {
            dispatch(fetchedHistory());
        }, [])
  return (
    <div>
        <WatchedVideos />
    </div>
  )
}

export default HistoryPage