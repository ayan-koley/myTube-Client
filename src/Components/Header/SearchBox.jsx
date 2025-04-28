import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetchedVideos } from "../../store/videoSlice.js";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const {loading} = useSelector(state => state.videoSlice);

  const searchVideo = (e) => {
    e.preventDefault();
    console.log(query)
    if (query.trim() !== "") {
      console.log(query);
      dispatch(fetchedVideos({query, page:1}));
    };
    setQuery("");
    navigate("/searchedvideo");
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={(e) => searchVideo(e)}>
        <TextField
          id="outlined-basic"
          label="Searched Here..."
          variant="outlined"
          size="small"
          value={query}
          className="bg-white rounded-l-xl w-full"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderTopLeftRadius: "10px",
              borderEndStartRadius: "10px",
              borderTopRightRadius: "0",
              borderEndEndRadius: "0", // Rounded corners
              borderColor: "gray", // Default border color
              transition: "0.3s", // Smooth transition

              "&:hover": {
                borderColor: "blue", // Change border color on hover
              },

              "&.Mui-focused": {
                borderColor: "black",
                color: "black",
                borderTopLeftRadius: "10px",
                borderEndStartRadius: "10px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white", // Outline color on focus
                },
              },
            },

            "& .MuiInputLabel-root": {
              color: "gray", // Default label color
              transition: "0.3s",
            },

            "& .MuiInputLabel-root.Mui-focused": {
              color: "black", // Change label color on focus
            },
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="outlined"
          startIcon={
            loading ? (
              <CircularProgress size="20px" sx={{ color: "black" }} />
            ) : (
              <SearchIcon className="text-black" />
            )
          }
          className="!bg-white !py-[9px] !rounded-r-xl !border-l-0"
          sx={{
            borderEndStartRadius: "0",
            borderTopLeftRadius: "0",
          }}
        />
      </form>
    </div>
  );
}

export default SearchBox;
