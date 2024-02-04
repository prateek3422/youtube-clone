import React, { useEffect, useState } from "react";
import { SideBar } from "../components";
import { VideoCard}  from "../components";
import ytServices from "../services/YoutuberServices";
const Home = () => {

  const [video, setVideo] = useState({})
  // console.log(video.data?.data)

  useEffect(() =>{
    (async() =>{
      try {
        const res = await ytServices.getVideos()
        setVideo(res.data)
        
      } catch (error) {
        console.log(error)
      }
    })()
  },[])
  
  return (
    <>
      <div className="container">
        <div className="grid-two-col gap-1">
          <div className="sidebar  w-full">
            <SideBar/>
          </div>
          <div className="main  w-full">
            <div className="grid grid-cols-3 gap-4">

              {
                video?.data?.data?.map((videos)=>(
                  <li key={videos.items.id} className="list-none">
                  <VideoCard {...videos}/>
                </li>
                ))
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
