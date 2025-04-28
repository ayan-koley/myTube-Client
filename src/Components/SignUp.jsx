import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUp = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);  // Ensure file is properly appended
      formData.append("coverImage", data.coverImage[0]);
      const createAccount = await axios.post("/api/v1/user/register", 
        formData
      );
      if (createAccount) {
        const loginSession = await axios.post("/api/v1/user/login", {
          email: data.email,
          password: data.password,
        });
        const userData = loginSession.data.message.user;
        if (userData) {
          dispatch(login(userData));
          toast.success(`Account created successfully. Welcome ${userData.fullname}!`)
          navigate("/");
        } else {
          setError("account getingprocess unsuccessful!");
        }
      } else {
        setError("Account creation failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container
      maxWidth="xs"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          mt: 3,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="h7" gutterBottom>
          Already have an account <Link to={`/login`} className="underline !text-blue-500 px-1" >Login</Link>
        </Typography>
        <form onSubmit={handleSubmit(signUp)}>
          {<p className="!text-black text-xl">{error}</p>}
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            size="small"
            {...register("username", { required: "username is required" })}
          />
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            size="small"
            {...register("fullname", { required: "Fullname is required" })}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            size="small"
            {...register("email", { required: "Email is required" })}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            size="small"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 2,
                message: "Password must be at least 2 characters",
              },
            })}
          />
<label
            className="block mb-2 text-[17px] font-medium text-gray-900 "
            htmlFor="avatar_input"
          >
            Upload Avatar
          </label>
          <input
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-800 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400
          p-2 font-medium"
            id="avatar_input"
            type="file"
            accept="image/*"
            {...register("avatar", {
              required: "Avatar is required"
            })}
          />
          <label
            className="block mb-2 text-[17px] font-medium text-gray-900 "
            htmlFor="coverimage_input"
          >
            Upload CoverImage
          </label>
          <input
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-800 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400
          p-2 font-medium"
            id="coverimage_input"
            type="file"
            accept="image/*"
            {...register("coverImage", {
              required: "CoverImage is required"
            })}
          />

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            endIcon={loading && <CircularProgress size="20px" />}
            disabled={loading}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
