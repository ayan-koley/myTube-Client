import React from 'react'

function UserAvatar({src}) {
  return (
    <div>
        <Avatar alt="owner" src={src} />
    </div>
  )
}

export default UserAvatar