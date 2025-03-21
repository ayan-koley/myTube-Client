import React, { useEffect, useState } from 'react'
import AddComment from './AddComment'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import AllComment from './AllComment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedComment } from '../../store/commentSlice';


function CommentSection({videoId}) {
    const {comment, error, loading} = useSelector(state => state.commentSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchedComment(videoId))
    }, [])
    
  return (
    <div className='!w-full md:w-1/2 rounded md:mx-3 my-3 text-gray-900 pb-5'>
        {error && <p className='text-red-400 m-2'>{error.message}</p>}
        {loading && <CircularProgress />}
        <div className='text-2xl pl-5 font-bold'>
            Comments
        </div>
        <div>
            <AddComment videoId={videoId} />
        </div>
        {loading ? (
            <CircularProgress color='success' />
        ) : (
            <AllComment comments={comment} />
        )}
    </div>
  )
}

export default CommentSection