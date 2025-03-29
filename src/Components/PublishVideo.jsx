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
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function PublishVideo() {
  // const [thumbnail, setThumbnail] = useState({});
  // const [videoFile, setVideoFile] = useState("");
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const publishNewVideo = async (data) => {
    setLoading(true);
    try {

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

      if (!newVideo.data.message[0]) {
        toast.error("Video Uploading failed")
        setError("Video Upload Failed");
      }
      toast.success("Your video has been uploaded successfully.");
      navigate(`/video/${newVideo.data.message[0]._id}`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
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
            accept="image/*"
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
            accept="video/*"
            {...register("videoFile", {
              required: "Video file is required",
              validate: (FileList) => {
                const file = FileList[0];
                console.log(file);
                if (!file) return "video file is requried";
                if (!file.type.startsWith("video/")) return "Invalid file type";
                if(file.size > 60 * 1024 * 1024) return "file size must be under 60mb";
                return true;
              },
            })}
          />
          {errors.videoFile && <p className="!text-red-500">{errors.videoFile.message}</p>}

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
