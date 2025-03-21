import React from 'react'
import { Avatar } from '@mui/material'

function UserAvatar({src, className=""}) {
  return (
    <div>
        <Avatar alt="owner" src={src} className={`${className}`} />
    </div>
  )
}

export default UserAvatar