import React from 'react'
import UserAvatar from './UserAvatar'
import { useParams } from 'react-router-dom'
import LikeButton from './LikeButton';
import SubscribedButton from './SubscribedButton';

function OwnerSection({ src, _id, isSubscriber = false, subscribedCount = 0, likesCount=0, viewsCount=0, username}) {
    const {videoId} = useParams();
    
  return (
    <div className='md:w-1/2 md:mx-3 !w-full bg-black p-3 rounded-xl md:px-3' style={{boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'}}>
        <div className='flex justify-between items-center'>
            <div className='flex items-center text-white'>
                <UserAvatar username={username} src={src} />
                <div className='ml-2'>{username}</div>
            </div>
            <div className='flex items-center justify-evenly'>
                <div>
                    <LikeButton _id={videoId} likes={likesCount} />
                </div>
                <div>
                    <SubscribedButton _id={_id} count={subscribedCount} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default OwnerSection