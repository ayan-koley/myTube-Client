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
    try {
      const formdata = new FormData();
      formdata.append("username", data.username);
      formdata.append("fullname", data.fullname);
      formdata.append("email", data.email);
      formdata.append("password", data.password);
      formdata.append("avatar", data.avatar[0]);
      formdata.append("coverImage", data.coverImage[0]);

      const createAccount = await axios.post("/api/v1/user/register", formdata);
      if (createAccount) {
        const userData = await axios.post("/api/v1/user/login", {
          email: data.email,
          password: data.password,
        });
        if (userData) {
          console.log(userData);
          dispatch(login(userData));
          setLoading(false);
          navigate("/");
          // TODO: After login redirect the user on prev page
        } else {
          setError("account getingprocess unsuccessful!");
        }
      } else {
        setError("Account creation failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
        <form onSubmit={handleSubmit(signUp)}>
          {<p className="!text-black text-xl">{error}</p>}
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            size="small"
            {...register("username", { required: "Name is required" })}
            // error={!!errors.name}
            // helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            size="small"
            {...register("fullname", { required: "Name is required" })}
            // error={!!errors.name}
            // helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            size="small"
            {...register("email", { required: "Email is required" })}
            // error={!!errors.email}
            // helperText={errors.email?.message}
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
            // error={!!errors.password}
            // helperText={errors.password?.message}
          />
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Avatar
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setAvatar(event)}
              {...register("avatar", { required: "avatar is required" })}
              single
            />
          </Button>
          {/* {avatar.trim() != '' && <p className="!text-black">{avatar}</p>} */}
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            className="!mt-2"
            startIcon={<CloudUploadIcon />}
          >
            Upload CoverImage
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setCoverImage(event.target.files[0].name)}
              {...register("coverImage", {
                required: "CoverImage is required",
              })}
              single
            />
          </Button>
          {coverImage.trim() != "" && (
            <p className="!text-black">{coverImage}</p>
          )}

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
