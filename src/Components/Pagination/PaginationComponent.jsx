import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedVideos } from "../../store/videoSlice";
import KeyboardDoubleArrowLeftIcon  from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { SearchSharp } from "@mui/icons-material";

function PaginationComponent({className="", count=10}) {
  const [page, setPage] = useState(1);
  const { query, searchedVideos } = useSelector(state => state.videoSlice);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchedVideos({query, page}))
      
  }, [page])

  return (
    <div className="flex">
      <button className="mx-5 bg-gray-500 p-2 rounded-2xl flex justify-center items-center hover:bg-gray-600 cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={() => setPage(page-1)}
      disabled={page <= 1}
      >
        <KeyboardDoubleArrowLeftIcon className="text-white" />
      </button>
      <button className="mx-5 bg-gray-500 p-2 rounded-2xl flex justify-center items-center hover:bg-gray-600 cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={() => setPage(page+1)}
      disabled={searchedVideos[query]?.length < 12}
      >
        <KeyboardDoubleArrowRightIcon className="text-white" />
      </button>
    </div>
  );
}

export default PaginationComponent;
