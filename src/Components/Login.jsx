import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  styled,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signIn = async (data) => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("email", data.email);
      formdata.append("password", data.password);

      const loginSession = await axios.post("/api/v1/user/login", data);
      const userData = loginSession.data?.data?.user;
      if (userData) {
        dispatch(login(userData));
        setLoading(false);
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err.message);
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
          Login
        </Typography>
        <Typography variant="h7" gutterBottom>
          Create a new account <Link to={`/sign-up`} className="underline !text-blue-500 px-1" >Sign Up</Link>
        </Typography>
        <form onSubmit={handleSubmit(signIn)}>
          {<p className="!text-red-500 text-xl font-bold ">{error}</p>}
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

export default Login;
