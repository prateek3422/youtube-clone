import React, { Children, useEffect, useState } from "react";
import { SideBar } from "../components";
import { VideoCard } from "../components";
import axios from "axios";
import videoService from "../services/VideoService";



const Home = () => {
  const [video, setVideo] = useState([]);
  const [query, setQuery] = useState("jjk");
// console.log(video)

  useEffect(() => {
    (async() =>{
     try {
      const videoData =  await videoService.getAllVideos()
      // console.log(videoData.data.docs)
      setVideo(videoData.data.docs)
     } catch (error) {
      console.log(error)
     }
    }
    )()
  }, []);



  return (
    <>
      <div className="container">
        <div className="grid-two-col gap-1">
          <div className="sidebar  w-full">
            <SideBar />
          </div>
          <div className="main  w-full">
            <div className="grid grid-cols-3 gap-4">
              {video.map((vid) => (
              // console.log(vid._id)
                <li key={vid._id} className="list-none">
                  <VideoCard {...vid}/>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
