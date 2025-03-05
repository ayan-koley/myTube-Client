import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './Components';
import { useDispatch } from 'react-redux';
import { fetchedVideos } from './store/videoSlice';

function App() {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchedVideos("v"));
  }, [])
  return (
    <>
    <Header />
      <main>
        <Outlet />
      </main>
    <Footer />
    </>
  )
}

export default App
