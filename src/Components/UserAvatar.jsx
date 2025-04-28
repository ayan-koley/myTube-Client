import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'

function UserAvatar({ username, src="#", className="", width="w-10", height="h-10"}) {

  return (
    <div>
        <Link to={`/profile/${username}`}>
          <Avatar alt="owner" src={src}  className={`${className} ${width} ${height}`} />
        </Link>
    </div>
  )
}

export default UserAvatar