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
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [{ src: src, type: 'video/mp4' }],
                    ...options
                })
            }

            requestAnimationFrame(() => {
                initilizeplayer();
            })
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
        <video controls ref={videoRef} className='video-js vjs-default-skin' />
    </div>
  )
}

export default VideoPlayer