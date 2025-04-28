import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header, Footer } from './Components';
import { useDispatch } from 'react-redux';
import { fetchedVideos } from './store/videoSlice';

function App() {

  return (
    <div className='bg-primary'>
    <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
