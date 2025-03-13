import React, { useEffect, useState } from 'react'
import AddComment from './AddComment'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import AllComment from './AllComment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchedComment } from '../../store/commentSlice';


function CommentSection({videoId}) {
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(false);
    const {comment} = useSelector(state => state.commentSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchedComment(videoId))
    }, [])

    // const fetchedComments = async() => {
    //     setLoading(true);
    //     try {
    //         const allComments = await axios.get(`/api/v1/comment/${videoId}`)
    //         console.log("all comments are", allComments);
    //         if(allComments && allComments.data.message.lenght < 1) {
    //             setError("Faild to fetched comments");
    //         }
    //         else setComments(allComments.data.message[0].data);
    //     } catch (err) {
    //         setError(err.message)
    //     }
    //     setLoading(false);
    // }
  return (
    <div className='!w-full md:w-1/2 rounded bg-gray-200 md:mx-3 my-3 text-gray-900 pb-5'>
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