import React from 'react'
import VideoTitle from './VideoSection/VideoTitle'
import VideoDescription from './VideoSection/VideoDescription'

function About({title, description}) {
  return (
    <div className='!w-full py-5 px-5 my-5 md:mx-3 md:w-1/2 bg-about text-white rounded-xl' style={{boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'}}>
        <div className='text-white text-2xl mb-3'>
            About
        </div>
        <div>
            <VideoTitle title={title} />
        </div>
        <div>
            <VideoDescription description={description} />
        </div>
    </div>
  )
}

export default About