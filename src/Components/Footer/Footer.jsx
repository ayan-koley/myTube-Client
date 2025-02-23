import React from 'react'
import { FaUpload } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { HiMiniServerStack } from "react-icons/hi2";

function Footer() {
    const FooterOptions = [
        {
            name: "History",
            icon: <FaHistory />,
            to: "/history"
        },{
            name: "Upload Video",
            icon: <FaUpload />,
            to: "/upload-video"
        },{
            name: "Dashboard",
            icon: <HiMiniServerStack />,
            to: "/dashboard"
        },
    ]
  return (
    <div className='bg-[#6B7074] fixed bottom-0 w-full flex justify-evenly items-center mt-5' style={{borderTop: '3px solid #EDEBEA'}}>
        {FooterOptions.map((item) => (
            <div key={item.name} className='flex gap-3 flex-col cursor-pointer m-5 md:text-xl justify-center items-center text-white hover:scale-105 duration-200 transition-all'>
                {item.icon}
                <span>{item.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Footer