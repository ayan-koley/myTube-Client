import React from 'react'
import { Avatar } from '@mui/material'

function UserAvatar({src}) {
  return (
    <div>
        <Avatar alt="owner" src={src} />
    </div>
  )
}

export default UserAvatar