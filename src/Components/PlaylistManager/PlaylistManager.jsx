import React, { useEffect, useState, useTransition } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiPlayListAddLine } from "react-icons/ri";

function PlaylistManager({videoId}) {
  const [showSections, setShowSections] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [isPending, startIsPending] = useTransition();
  const {status, userData} = useSelector(state => state.authSlice);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchedPlaylists = async() => {
      try {
        const response = await axios.get(`/api/v1/playlist/user/${userData._id}`);
        startIsPending(() => setPlaylists(response.data.data));
      } catch (err) {
        toast.error(err.message);
      }
    }
    if(status) fetchedPlaylists();
  }, [newPlaylistName])

  const handleCreatePlaylist = async(e) => {
    e.preventDefault();
    if (status && newPlaylistName.trim() && newPlaylistDescription.trim()) {
      try {
        const response = await axios.post(`/api/v1/playlist`, {
          name: newPlaylistName,
          description: newPlaylistDescription
        });
        if(response.data.data && response.data.data.length > 0) {
          startIsPending(() => setPlaylists([...playlists, response.data.data[0]]));
        }
        toast.success("Playlist hasbeen create successfully");
        setNewPlaylistName('');
        setNewPlaylistDescription('');
      } catch (err) {
        toast.error(err);
      }
    } else {
      navigate("/login", {state: {from: location}});
    }
  };

  const handleAddVideoonPlaylist = async(playlistId) => {
    if(!playlistId.trim() || !videoId.trim()) return toast.error("Invalid Playlist id or video id");
    try {
      const response = await axios.patch(`/api/v1/playlist/add/${playlistId}/${videoId}`);
      toast.success("Video added successfully!");
    } catch (err) {
      toast.error("Video is already have in this playlist");
    }
  }


  const handleBackdropClick = (e) => {
    if (e.target.id === 'playlist-backdrop') {
      setShowSections(false);
    }
  };

  return (
    <div className="relative z-2 ">
      <div className="flex flex-col items-center p-2">
        <Button
          variant="contained"
          className="mb-4 !text-xl !bg-transparent"
          onClick={() => setShowSections(true)}
        >
          {<RiPlayListAddLine />}
        </Button>
      </div>

      {showSections && (
        <div
          id="playlist-backdrop"
          className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl rounded-2xl shadow-xl p-6" 
            onClick={(e) => e.stopPropagation()}>
            <Card className="p-4 w-full">
              <CardContent>
                <Typography variant="h6" className="mb-2">Create New Playlist</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Playlist Name"
                  value={newPlaylistName}
                  className='!mb-2'
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Playlist Description"
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleCreatePlaylist}
                  className="!mt-4 !bg-green-600 hover:!bg-green-700"
                  disabled={isPending}
                >
                  Save Playlist
                </Button>
              </CardContent>
            </Card>
            <Card className="p-4 w-full">
              <CardContent>
                <Typography variant="h6" className="mb-2">Your Playlists</Typography>
                {playlists.length === 0 ? (
                  <Typography variant="body2">No playlists created yet.</Typography>
                ) : (
                  <div className="list-disc list-inside">
                    {playlists.map((playlist, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAddVideoonPlaylist(playlist._id)}
                        variant='outlined'
                        fullWidth
                        className='!mb-2'
                      >
                        {playlist.name}
                        </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistManager;
