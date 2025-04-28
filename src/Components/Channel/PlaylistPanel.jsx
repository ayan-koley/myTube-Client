import React, { useEffect, useState, useTransition } from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const PlaylistPanel = ({usernme, channelId, value, index}) => {
  const [playlists, setPlaylists] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleNavigate = (playlistId) => {
     navigate(`/${playlistId}/videos`);
  }

  useEffect(() => {
    const fetchPlaylist = async() => {
      try {
        const response = await axios.get(`/api/v1/playlist/user/${channelId}`);
        
        console.log(response.data);
        startTransition(() => setPlaylists(response.data.data));
      } catch (err) {
        setError(err.message);
      }
    }
    fetchPlaylist();
  }, [channelId])

  return isPending ? (
    <div>
      <CircularProgress />
    </div>
  ) : (
    <div hidden={value !== index} className="py-10 p-5 text-white rounded-xl shadow-2xl">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        { playlists && playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700 transition duration-300 rounded-lg cursor-pointer flex justify-between items-center pr-8 hover:pr-3"
              onClick={() => handleNavigate(playlist._id)}
            >
              <div>
                <h2 className="text-xl font-semibold text-blue-300">{playlist.name}</h2>
                <p className="text-gray-400 text-sm">{playlist.description}</p>
              </div>
              <div>
                <KeyboardDoubleArrowRightIcon />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No playlists found</p>
        )}
      </div>
      
    </div>
  );
};

export default PlaylistPanel;
