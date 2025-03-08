import { useRef, useEffect } from 'react'
import videojs from 'video.js'

function VideoPlayer({src, options}) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        if(!playerRef.current) {
            const videoElement = videoRef.current;
            if(!videoElement) return;

            const initilizeplayer = () => {
                playerRef.current = videojs(videoElement, {
                    controls: true,
                    autoplay: false,
                    responsive: true,
                    height: 640,
                    width: 360,
                    sources: [{
                        src,
                        type: "video/mp4"
                    }],
                    ...options
                })
            }

            setTimeout(() => {
               initilizeplayer();
            }, 1000);
        }

        return () => {
            if(playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        }
    }, [src, options])

  return (
    <div data-vjs-player>
        <video ref={videoRef} className='video-js vjs-default-skin' />
    </div>
  )
}

export default VideoPlayer