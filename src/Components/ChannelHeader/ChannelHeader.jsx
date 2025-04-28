import React from 'react'
import {UserAvatar, LikeButton, SubscribedButton} from '../index'
import PlaylistManager from '../PlaylistManager/PlaylistManager';
import {Link} from 'react-router-dom'

function ChannelHeader({ src, _id, subscribedCount = 0, likesCount=0, viewsCount=0, username, videoId}) {

  return (
    <div className='md:w-1/2 md:mx-3 !w-full bg-black p-3 rounded-xl md:px-3' style={{boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'}}>
        <div className='flex justify-between items-center'>
            <Link to={`/profile/${username}`} className='flex items-center text-white'>
                <UserAvatar username={username} src={src} />
                <div className='ml-2'>{username}</div>
            </Link>
            <div className='flex items-center justify-evenly'>
                <div>
                    <PlaylistManager videoId={videoId} />
                </div>
                <div>
                    <LikeButton videoId={videoId} likes={likesCount} />
                </div>
                <div>
                    <SubscribedButton username={username} _id={_id} count={subscribedCount} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChannelHeader