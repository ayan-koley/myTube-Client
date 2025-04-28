import React from 'react'
import { Link } from 'react-router-dom';
import { HiMiniServerStack } from "react-icons/hi2";
import { BsClockHistory } from "react-icons/bs";
import { FiUploadCloud } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";

function HeaderOptions() {
    const options = [
        {
          name: "History",
          icon: <BsClockHistory />,
          to: "/watch-history",
        },
        {
          name: "Upload Video",
          icon: <FiUploadCloud />,
          to: "/upload-video",
        },
        {
          name: "Dashboard",
          icon: <RxDashboard />,
          to: "/dashboard",
        },
      ];
  return (
    <div className='hidden lg-2:flex justify-between md:w-1/4'>
        {options.map((item, index) => (
            <Link to={`${item.to}`} key={index} className='flex items-center text-gray-500 hover:text-white'>
                <div className='mr-3'>{item.icon}</div>
                <p>{item.name}</p>
            </Link>
        ))}
    </div>
  )
}

export default HeaderOptions