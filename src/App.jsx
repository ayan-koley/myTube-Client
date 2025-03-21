import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header, Footer } from './Components';
import { useDispatch } from 'react-redux';
import { fetchedVideos } from './store/videoSlice';

function App() {

  return (
    <div className='bg-linear-to-t from-[#030307] to-[#1d1a3a]'>
    <Header />
      <main>
        <Outlet />
      </main>
    {/* <Footer /> */}
    </div>
  )
}

export default App
