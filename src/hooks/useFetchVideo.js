import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

const useFetchVideo = (action, query, page=1) => {
    const dispatch = useDispatch();
    const {searchedVideos} = useSelector(state => state.videoSlice);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetcheData = async() => {
            setLoading(true);
            setError(null);
            try {
                await dispatch(action({query, page}));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetcheData();

    }, [dispatch, action, query])

    const video = searchedVideos[query] || [];
    return {video, loading, error};
}

export default useFetchVideo;