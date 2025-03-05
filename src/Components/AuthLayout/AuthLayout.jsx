import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AuthLayout({isAuthentication = true}) {
    const navigate = useNavigate();
    const {status } = useSelector((state) => state.authLayout);
    if(status && isAuthentication) {
        navigate("/")
    } 
    else if(!isAuthentication )
  return (
    <div></div>
  )
}

export default AuthLayout