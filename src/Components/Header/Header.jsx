import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { fetchedVideos } from "../../store/videoSlice.js";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {logOut} from '../../store/authSlice.js';
import UserAuth from "./UserAuth.jsx";

function Header() {

  const [query, setQuery] = useState("");
  const [inMobileNav, setInMobileNav] = useState(false);
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => state.videoSlice);
  const {status} = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

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

  // videoSearching call 
  const searchVideo = (e) => {
    console.log(e);
    e.preventDefault();
    console.log(query);
    if(query.trim() !== "") 
    dispatch(fetchedVideos(query))
    setQuery("");
    navigate("/");
  }

  const logoutHandler = async() => {
    try {
      const logoutSession = await axios.post("/api/v1/user/logout");
      if(logoutSession) {
        dispatch(logOut());
        navigate("/")
        
      }
    } catch (error) {
      
    }
  }


  return (
    <>
      <nav className="h-13 md:h-18 bg-[#6B7074] px-3 md:px-5 flex items-center justify-between gap-5">
        <div className="light:text-dark dark:text-white text-xl md:text-4xl flex items-center ">
          <Link to={"/"} className="font-bold">myTube</Link>
        </div>
        <div className="md:w-1/2">
          <form className="flex items-center" onSubmit={(e) => searchVideo(e)}>
            <TextField
              id="outlined-basic" 
              label="Searched Here..." 
              variant="outlined"
              size="small"
              value={query}
              className="bg-white rounded-l-xl w-full"
              sx={{
                '& .MuiOutlinedInput-root': {
                    borderTopLeftRadius: '10px',
                    borderEndStartRadius: '10px', 
                    borderTopRightRadius: '0',
                    borderEndEndRadius: '0',// Rounded corners
                    borderColor: 'gray', // Default border color
                    transition: '0.3s', // Smooth transition

                    '&:hover': {
                      borderColor: 'blue', // Change border color on hover
                    },

                    '&.Mui-focused': {
                      borderColor: 'black',
                      color: 'black', 
                      borderTopLeftRadius: '10px',
                      borderEndStartRadius: '10px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white', // Outline color on focus
                      },
                    },
                  },

                  '& .MuiInputLabel-root': {
                    color: 'gray', // Default label color
                    transition: '0.3s',
                  },

                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black', // Change label color on focus
                },
              }}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
            type="submit"
            variant="outlined" 
            startIcon={
              loading ? (<CircularProgress size="20px" sx={{color: "black"}} />) :
               (<SearchIcon className="text-black" />)
            }
            className="!bg-white !py-[9px] !rounded-r-xl !border-l-0"
            sx={{
              borderEndStartRadius: '0',
              borderTopLeftRadius: '0'
            }}
            />
          </form>
        </div>
        {inMobileNav == false ? (<div className="md:hidden cursor-pointer text-white"
        onClick={()=> setInMobileNav(!inMobileNav)}
        >
            <CiMenuFries className="text-2xl" />
        </div>) : (<div className="md:hidden cursor-pointer text-white"
        onClick={()=> setInMobileNav(!inMobileNav)}
        >
            <IoMdClose className="text-2xl" />
        </div>)}
        <div className="hidden md:flex gap-5">
            {/* {headerItems.map((item, index) => (
              item.view && 
             ( <Link to={item.to} key={index} className="cursor-pointer font-medium text-white text-[20px] hover:underline ">
              {item.name}
              </Link>)
            ))}
            {status && (<div onClick={logoutHandler} key={10} className="px-3.5 text-white text-xl hover:underline cursor-pointer flex items-center justify-center">
          Logout
        </div>)} */}
          <UserAuth />
        </div>
      </nav>
      {inMobileNav && <div className={`h-screen inset-0 bg-[#6B7074] flex flex-col`}>
        {
          headerItems?.map((item, index) => (
            item.view && 
             (<Link to={item.to} key={index} className="px-3.5 mt-2 text-white text-xl hover:underline cursor-pointer">
              {item.name}
            </Link>)
          ))
        }
        {status && <div onClick={logoutHandler} key={10} className="px-3.5 mt-2 text-white text-xl hover:underline cursor-pointer">
          Logout
        </div>}
       </div>}
    </>
  )
}

export default Header;
