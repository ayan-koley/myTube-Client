import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import VideoPanel from './VideoPanel'

function ChannelTabs({channelId}) {
    const [tab, setTab] = useState(0);
    const tabOptions = [
        {
            name: "VIDEOS",
            disable: false
        },{
            name: "PLAYLISTS",
            disable: true
        },{
            name: "Tweets",
            disable: true
        }
    ]
  return (
    <div>
         <Tabs 
            value={tab} 
            onChange={(_, newValue) => setTab(newValue)}
            className="border-b border-gray-800"
            textColor="primary"
            indicatorColor="primary"
        >
            {
                tabOptions.map((item, index) => (
                    <Tab key={index} value={index} label={item.name} className={`${item.disable ? '!text-gray-500' : '!text-white'}`} disabled={item.disable} />
                ))
            }
        </Tabs>
        <VideoPanel channelId={channelId} value={tab} index={0} />
    </div>
  )
}

export default ChannelTabs