import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchedHistory } from '../store/historySlice';
import WatchedVideos from '../Components/WatchedVideos';

function HistoryPage() {
    const {userData} = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    if(userData) {
        useEffect(() => {
            dispatch(fetchedHistory());
        }, [])
    }
  return (
    <div>
        <WatchedVideos />
    </div>
  )
}

export default HistoryPage