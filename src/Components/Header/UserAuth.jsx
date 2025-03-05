import React, { useState } from 'react'
import { Avatar } from '@mui/material'
import { CiUser } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {logOut} from '../../store/authSlice';
import { useDispatch } from 'react-redux';

function UserAuth() {
    const [isList, setIsList] = useState(false);
    const [error, setError] = useState(null)
    const {status, userData} = useSelector((state) => state.authSlice);
    const dispatch = useDispatch();
    
    const logoutHandler = async() => {
        setError(null);
        try {
          const logoutSession = await axios.post("/api/v1/user/logout");
          console.log(logoutSession);
          if(logoutSession) {
            dispatch(logOut());
            navigate("/")
            
          }
        } catch (err) {
          setError(err.message)
        }
      }
    
    const headerItems = [
        {
          name: "Login",
          to: "/login",
          view: !status
        },
        {
          name: "Sign Up",
          to: "/sign-up",
          view: !status
        }
      ]
  return (
    <div className='cursor-pointer' onClick={() => setIsList(!isList)}>
        <Avatar alt="Remy Sharp" sx={{backgroundColor: 'white'}} src={userData?.avatar?.url} >
            {status ? <img src={userData?.avatar?.url} /> : <CiUser className='text-black font-medium text-2xl' />}
        </Avatar>
        {
            isList && 
            <div className='absolute right-10 top-20 shadow-2xl bg-gradient-to-br from-blue-100 to-slate-100  border flex p-5 flex-col rounded-xl'> 
            {headerItems.map((item, index) => (
              item.view && 
             ( <Link to={item.to} key={index} className="cursor-pointer font-medium text-black text-[18px]  hover:underline p-3">
              {item.name}
              </Link>)
            ))}
            {status && (<div onClick={logoutHandler}  className="px-3.5 text-black text-xl hover:underline cursor-pointer flex items-center justify-center font-bold">
          Logout
        </div>)}
        </div>
        }
        
    </div>
  )
}

export default UserAuth