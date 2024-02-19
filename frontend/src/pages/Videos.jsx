import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoService from "../services/VideoService";

const Videos = () => {
  const {slug} = useParams();
  const navigate = useNavigate()
  const [video, setVideo] = useState({})
  console.log(video)
  console.log(video.duration)


  useEffect(() => {
    (async () => {
      try {

        if (slug) {
        const data = await videoService.getSingeVideo(slug)
        // console.log(data.data)
        setVideo(data.data)
        }else{
          navigate("/")
        }
      } catch (error) {
        console.log(error)
      }
    })();
  }, []);
  return (
    <>
    <div className="video">
      <h1>{video.title}</h1>
    </div>
    </>
  );
};

export default Videos;
