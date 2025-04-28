import React from 'react'
import { SubscribedButton, UserAvatar } from '../index'

function ChannelDetails({avatar, fullname, username, subscriberCount, channelSubscribedCount, channelId}) {
  return (
    <div>
        <div className="flex items-center  gap-4 justify-center">
            <UserAvatar src={avatar} width={"w-14"} height={"h-14"} />
            <div className="flex-1">
                <h1 className="text-xl font-bold">{fullname}</h1>
                <p className="text-gray-400">@{username}</p>
                <p className="text-gray-400 text-sm">{subscriberCount} subscribers • {channelSubscribedCount} subscribed channel</p>
            </div>
            <div className='mr-5'>
                <SubscribedButton username={username} _id={channelId} />
            </div>
            </div>
    </div>
  )
}

export default ChannelDetails