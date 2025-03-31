import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChannelTabs from './ChannelTabs';
import ChannelDetails from './ChannelDetails';


function ChannelProfile() {
    const {username} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [tab, setTab] = useState(0);
   

    
    useEffect(() => {
        const fetchedChannelDetails = async() => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/v1/user/profile/${username}`);
                if(!response) {
                    setError("usernot found");
                }setUserDetails(response.data.message);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        }
        fetchedChannelDetails();
    }, [])



  return Object.keys(userDetails).length === 0  ? (
    <div>
        {error &&  <p className='!text-red-500 text-2xl'>{error}</p>}
    </div>
  ) :  (
   <div>
        {/* channel banner */}
        <div className="relative">
            <img 
            src={userDetails?.coverImage.url}
            alt="Channel Banner"
            className="w-full h-[200px] object-cover"
            />
        </div>
        {/* channel info */}
        <div className="p-4">
            <ChannelDetails avatar={userDetails.avatar.url} fullname={userDetails.fullname} username={userDetails.username} subscriberCount={userDetails.subscriberCount} channelSubscribedCount={userDetails.channelSubscribedCount} isSubscribed={userDetails.isSubscribed} channelId={userDetails._id} />
      </div>
      <div>
        {/* Navigation Tabs */}
        <ChannelTabs channelId={userDetails._id} />
      </div>
   </div>
  )
}

export default ChannelProfile