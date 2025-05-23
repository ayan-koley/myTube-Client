import { Button } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addComment} from '../../store/commentSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AddComment({videoId}) {
    const[loading, setLoading] = useState(false);
    const[comment, setComment] = useState("");
    const[error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status} = useSelector(state => state.authSlice);
    const location = useLocation();

    const submitComment = async(e) => {
        if(!status) return navigate("/login", {state: {from : location}});
        e.preventDefault();
        setLoading(true);
        try {
            const uploadComment = await axios.post(`/api/v1/comment/${videoId}`, {
                content: comment
            });
            if(!uploadComment) setError("Faild to upload comment");
            else toast.success("Successfully comment create");
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
            setComment("");
        }
    }

  return (
    <div className='p-2'>
        <div className='text-red-700 py-5'>{error}</div>
        <form className="mb-6" onSubmit={(e) => submitComment(e)}>
        <div className="py-2 px-4 mb-4 bg-amber-50 rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." 
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                required
                >

                </textarea>
        </div>
        <Button 
            loading = {loading}
            variant='contained'
            disabled = {loading}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center !text-gray-400 !bg-gray-800 hover:bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900">
            Post comment
        </Button>
    </form>
    </div>
  )
}

export default AddComment