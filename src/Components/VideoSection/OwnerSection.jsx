import React, { useState } from 'react'
import UserAvatar from '../UserAvatar.jsx';
import SubscriberButton from '../SubscribedButton.jsx';

function OwnerSection({src, subscribers=0}) {
  return (
    <div>
        <div>
            <UserAvatar src={src} />
        </div>
        <div>
            <SubscriberButton count={subscribers} />
        </div>
    </div>
  )
}

export default OwnerSection