import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  styled,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function PublishVideo() {
  // const [thumbnail, setThumbnail] = useState({});
  // const [videoFile, setVideoFile] = useState("");
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const publishNewVideo = async (data) => {
    setLoading(true);
    try {
      console.log("data is ", data);

      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("userId", userData._id);
      formdata.append("thumbnail", data.thumbnail[0]);
      formdata.append("videoFile", data.videoFile[0]);
      formdata.append("isPublished", data.isPublished);
      const newVideo = await axios.post(
        "/api/v1/video/publish-video",
        formdata
      );
      if (!newVideo) {
        setError("Video Upload Failed");
      }
      // TODO: navigate on this uploaded video
      navigate("/");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
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

  console.log(error);
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
          Publish New Video
        </Typography>
        <form onSubmit={handleSubmit(publishNewVideo)}>
          {<p className="!text-red-500 text-xl">{error}</p>}
          <TextField
            fullWidth
            label="video Title"
            margin="normal"
            size="small"
            {...register("title", { required: "Name is required" })}
            // error={!!errors.name}
            // helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Video Description"
            margin="normal"
            size="small"
            {...register("description", { required: "Name is required" })}
            // error={!!errors.name}
            // helperText={errors.name?.message}
          />
          <FormLabel id="demo-radio-buttons-group-label">Visibility</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="true"
            name="radio-buttons-group"
            {...register("isPublished")}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Publish"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Private"
            />
          </RadioGroup>

          <label
            className="block mb-2 text-[17px] font-medium text-gray-900 "
            htmlFor="thumbnail_input"
          >
            Upload Thumbnail
          </label>
          <input
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-800 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400
          p-2 font-medium"
            id="thumbnail_input"
            type="file"
            {...register("thumbnail")}
          />

          <label
            className="block mb-1 text-[17px] font-medium text-gray-900"
            htmlFor="video_input"
          >
            Upload Videofile
          </label>
          <input
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-800 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400
          p-2 font-medium"
            id="video_input"
            type="file"
            {...register("videoFile", {
              required: "Video file is required",
              validate: (FileList) => {
                const file = FileList[0];
                console.log(file.type);
                if (!file) return "video file is requried";
                if (file.type !== "video/mp4") return "Invalid file type";
                if (file.size > 50 * 1024 * 1024)
                  return "File size must be under 50mb";
                return true;
              },
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
            Upload Video
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default PublishVideo;
