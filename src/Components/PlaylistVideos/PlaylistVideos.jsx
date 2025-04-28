import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useTransition } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import {VideoCard} from '../index'
import { Link } from 'react-router-dom';

function PlaylistVideos() {
  const {playlistId} = useParams();
    const [videos, setVideos] = useState([]);
    const [isPending, startPending] = useTransition();
    const [error, setError] = useState(null);
    const [playlistname, setPlaylistname] = useState(""); 

    useEffect(() => {
        const fetchVideos = async() => {
          setError(null);
          try {
            console.log(playlistId);
              const response = await axios.get(`/api/v1/playlist/${playlistId}/videos`);
              startPending(() => {
                setVideos(response.data.data[0].videos)
                setPlaylistname(response.data.data[0].name)
              });
          } catch (err) {
              setError(err);
          }
        }
        fetchVideos();
    }, [playlistId])
  return isPending ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <div>
      <div className='!text-white underline text-2xl text-center pt-5'>
        {playlistname}
      </div>
      {videos.length > 0 ? (
        <div className="grid lg-2:grid-cols-4 md:grid-cols-3 md-2:grid-cols-2 mx-auto gap-10 py-8">
          {videos.map((video) => (
            <div key={video._id} className="flex justify-center mt-5">
              <Link to={`/video/${video._id}`}>
                <VideoCard
                  avatar={video.owner.avatar.url}
                  thumbnail={video.thumbnail.url}
                  title={video.title}
                  username={video.owner.username}
                  createdAt={video.createdAt}
                  views={video.views}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
            <h1 className='!text-white'>Playlist is empty</h1>
        </div>
      )}
    </div>
  )
}

export default PlaylistVideos