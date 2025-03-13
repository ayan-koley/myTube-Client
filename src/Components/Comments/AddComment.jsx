import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from 'react-redux';
import {addComment} from '../../store/commentSlice.js';

function AddComment({videoId}) {
    const[loading, setLoading] = useState(false);
    const[comment, setComment] = useState("");
    const[error, setError] = useState(null);
    const dispatch = useDispatch();

    const submitComment = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const uploadComment = await axios.post(`/api/v1/comment/${videoId}`, {
                content: comment
            });
            if(!uploadComment) setError("Faild to upload comment");
            else dispatch(addComment(uploadComment.data));
            setComment("");
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }
  return (
    <div className='p-5'>
        <div className='text-red-700'>{error}</div>
        <form className="flex items-center" onSubmit={(e) => submitComment(e)}>
                    <TextField
                      id="outlined-basic"
                      label="Add new Comment..."
                      variant="outlined"
                      size="small"
                      value={comment}
                      className="bg-gray-100 rounded-l-xl w-full"
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
                      onChange={(e) => setComment(e.target.value)}
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
  )
}

export default AddComment