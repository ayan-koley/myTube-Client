import { useState, useCallback } from "react";
import { Avatar, IconButton, TextField, Button } from "@mui/material";
import { Edit, PhotoCamera } from "@mui/icons-material";
import { RxUpdate } from "react-icons/rx";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ProfileSection() {
  
  const {status, userData } = useSelector((state) => state.authSlice);

  const [coverImage, setCoverImage] = useState(userData?.coverImage?.url || "");
  const [avatar, setAvatar] = useState(userData?.avatar?.url);

  const [name, setName] = useState(userData?.fullname);
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [nameLoader, setNameLoader] = useState(false);

  const handleImageChange = useCallback((event, setImage) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setImage(URL.createObjectURL(file));
      changeCoverImage(file);
    }
  }, []);

  const changeCoverImage = async(file) => {
    console.log(file);
    const formdata = new FormData();
    formdata.append('coverImage', file);
    try {
      await axios.patch(
        "/api/v1/user/change-coverimage", formdata);
      if (!changeCoverImage) {
        setError("Failed to change coverImage");
      }
    } catch (err) {
      setError(err.message);
    }
  } 

  // const changeName = async() => {
  //   setNameLoader(true);
  //   try {
  //     const updated = await axios.patch("/api/v1/user/change-coverimage")
  //   } catch (error) {
      
  //   }
  // }
  


  return status ? (
    <div className="max-w-4xl mx-auto p-4 shadow-lg rounded-lg bg-white">
      {error && <div className="text-red-300 p-3">{error}</div>}
      {/* Cover Image */}
      <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={coverImage}
          alt={username}
          className="w-full h-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => handleImageChange(e, setCoverImage)}
        />
      </div>

      {/* Avatar */}
      <div className="relative flex justify-center mt-[-50px]">
        <Avatar src={avatar} className="!w-20 !h-20 border-4 border-white " />
        <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
          <PhotoCamera fontSize="small" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setAvatar)}
          />
        </label>
      </div>

      {/* Profile Details */}
      <div className="flex flex-col items-center mt-4 space-y-4">
        <div className="w-full flex mt-2">
          <TextField
            label="Full Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <IconButton
            className="!ml-2"
            onClick={() => alert(`${name} updated`)}
          >
            <RxUpdate />
          </IconButton>
        </div>
        <div className="w-full flex mt-2">
          
          <TextField
            label="Username"
            type="text"
            value={username}
            variant="outlined"
            fullWidth
          />
          </div>
          <div className="w-full flex mt-2">
            <TextField
              label="Email"
              value={email}
              type="email"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="w-full flex mt-2">
            <TextField
              label="Password"
              type="text"
              variant="outlined"
              value={password}
              onChange={(e) => setter(e.target.value)}
              fullWidth
            />
            <IconButton
              className="!ml-2"
              onClick={() => alert(`${password} updated`)}
            >
              <RxUpdate />
            </IconButton>
          </div>
        </div>
      </div>
  ) : (
    <div>
      <div className="text-white">
        Unauthorized Request
      </div>
    </div>
  )
}
