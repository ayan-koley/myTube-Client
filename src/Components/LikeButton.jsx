import React, { useEffect } from 'react'
import { useState } from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { IconButton  } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GiSelfLove } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';

function LikeButton({likes, _id}) {
    const [like, setLike] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const {status} = useSelector(state => state.authSlice);
    const navigate = useNavigate();

    if(status) {
        
        useEffect(() => {
            const fetchedLikeStatus = async() => {
                const likeStatus = await axios.get(`/api/v1/like/status/${_id}`);
                setIsLiked(likeStatus.data.data.isLiked);
            }
            fetchedLikeStatus();
        }, [_id])
    }

    const toggleLikes = async() => {
        if(!status) navigate("/");
        setLoader(true)
        setError(null);
        try {
            const response = await axios.post(`/api/v1//like/toggle/v/${_id}`);
            if(response.data.message.includes('create')) {
                console.log("work this progress");
                setLike(prev => prev + 1);
                setIsLiked(true)
            }   else {
                setLike(prev => prev - 1);
                setIsLiked(false);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoader(false);
        }
    }

  return loader ? (
    <IconButton loading />
  ) : (
    <div className='flex items-center text-white w-10 mr-5'>
        <IconButton onClick={toggleLikes} >
            <GiSelfLove className={`${isLiked ? 'text-red-400' : 'text-white'}`} />
        </IconButton>
        <p className='!text-white'>{like}</p>
        {error && <p className='text-red-400'>{error}</p>}
    </div>
  )
}

export default LikeButton