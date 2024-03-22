import React, { useRef, useEffect, useState } from "react";
import { IoIosPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import Hls from "hls.js";

const VideoPlayer = () => {
  const [hide, setHide] = useState(false)

  const videoref = useRef(null);
  let hls;

  // console.log(videoref.current)


  const [currentTime, setCurrentTime] = useState()
  const [duration, setDuration] = useState()
  // console.log(src)
  // console.log(videoref)
  // console.log(currentTime)
  // console.log(duration)


useEffect(() =>{
  if(Hls.isSupported()){
    const hls = new Hls()
    hls.loadSource(vidSrc)
    hls.attachMedia(videoref.current)
  }else if(videoref.current.canPlayType('application/../../../assets/video/video.mpegurl')){
    videoref.current.src = vidSrc
  }
  })


const handlePlay = () =>{
  videoref.current.play()
  setHide(true)
}
const handlePause = () =>{
  videoref.current.pause()
  setHide(false)
}
const handlefarword = () =>{
  videoref.current.currentTime += 10
}
const handleRewind = () =>{
  videoref.current.currentTime -= 10
}




  useEffect(() => {
    const video = videoref.current
    
    // console.log(video)
    const timeHandler = () =>{
      setCurrentTime(video.currentTime)
    }

    const durationHandler = () =>{
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", timeHandler)
    video.addEventListener("loadedmetadata", durationHandler)

    return () =>{

      video.removeEventListener("timeupdate", timeHandler)
      video.removeEventListener("loadedmetadata", durationHandler)
    }

  }, []);

  return (
    <div className="video-container ">
      <video ref={videoref}></video>

      <div className="video-controller flex  gap-2 justify-between items-center">
        <div className="play-pause">
          <div className={`${hide ? "hidden" : "block"}`} onClick={handlePlay}>
            <IoIosPlay />
          </div>
          <div className={`${hide ? "block" : "hidden"}`} onClick={handlePause}>
            <FaPause />
          </div>
        </div>
        
        <div className="control-btn" onClick={handleRewind}>
          <FaBackward />
        </div>

        <div className="control-btn" onClick={handlefarword}>
          <FaForward />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
