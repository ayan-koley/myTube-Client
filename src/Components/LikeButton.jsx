import React, { useEffect } from 'react'
import { useState } from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { IconButton  } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { GiSelfLove } from "react-icons/gi";

function LikeButton({likes, _id}) {
    // 2 dbs call 1st for provide likes 2nd for remove likes
    const [like, setLike] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const {status} = useSelector(state => state.authSlice);
    
    const handleLikeState = () => {
        
        if(!status) {
            setIsLiked(!isLiked);
        }
    }
    useEffect(() => {
        toggleLikes();
        if(isLiked) setLike(like+1);
        else setLike(likes);
    }, [isLiked])

    const toggleLikes = async() => {
        setLoader(true)
        try {
            const response = await axios.post(`/api/v1//like/toggle/v/${_id}`);

            if(!response) {
                return setError("Failure on like")
            } 
            setLoader(false)
        } catch (err) {
            setError(err.message)
            setLoader(false)
        }
    }
  return loader ? (
    <IconButton loading />
  ) : (
    <div className='flex items-center text-white w-10'>
        <IconButton onClick={handleLikeState} >
            <GiSelfLove className={`${isLiked ? 'text-red-400' : 'text-white'}`} />
        </IconButton>
        {/* <p className='!text-black mx-3'>{like}</p> */}
    </div>
  )
}

export default LikeButton