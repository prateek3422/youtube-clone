import React, { Children, useEffect, useState } from "react";
import { VideoCard } from "../components";
import videoService from "../services/VideoService";
import { useSelector } from "react-redux";

const Home = () => {
  const [video, setVideo] = useState([]);
  const [query, setQuery] = useState("jjk");
  // console.log(video);


  useEffect(() => {
    (async () => {
      try {
        const videoData = await videoService.getAllVideos();
        console.log(videoData.data.data)
        setVideo(videoData.data.data.docs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="main  w-full">
          <div className="grid  grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            {video.map((vid) => (
              <li key={vid._id} className="list-none">
                <VideoCard {...vid} />
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
