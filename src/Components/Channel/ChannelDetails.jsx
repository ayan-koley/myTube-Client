import React from 'react'
import UserAvatar from '../UserAvatar';
import { Button } from '@mui/material';
import SubscribedButton from '../SubscribedButton';

function ChannelDetails({avatar, fullname, username, subscriberCount, channelSubscribedCount, isSubscribed, channelId}) {
  return (
    <div>
        <div className="flex items-center  gap-4 justify-center">
            <UserAvatar src={avatar} width={"w-14"} height={"h-14"} />
            <div className="flex-1">
                <h1 className="text-xl font-bold">{fullname}</h1>
                <p className="text-gray-400">@{username}</p>
                <p className="text-gray-400 text-sm">{subscriberCount} subscribers • {channelSubscribedCount} subscribed channel</p>
            </div>
            {/* <Button variant="contained" className={`${isSubscribed ? 'bg-green-400' : 'bg-red-600'}`}>
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </Button> */}
            <div className='mr-5'>
                <SubscribedButton _id={channelId} />
            </div>
            </div>
    </div>
  )
}

export default ChannelDetails