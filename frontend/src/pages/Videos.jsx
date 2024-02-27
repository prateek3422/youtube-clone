import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoService from "../services/VideoService";
import { useDispatch, useSelector } from "react-redux";
import { BiLike } from "react-icons/bi";
import { Subscribe, unSubscribe } from "../store/subscriberSlice";

const Videos = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({});
  const isSubscribe = useSelector((state) => state.subscribe.status);

  // console.log(video);
  // console.log(video.owner?._id);
  // console.log(video.duration)
  // console.log(subscribe)

  useEffect(() => {
    (async () => {
      try {
        if (slug) {
          const singleVideoData = await videoService.getSingeVideo(slug);
          // console.log(singleVideoData.data);
          setVideo(singleVideoData.data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  



  const handleSubscribe = async() =>{
   try {
    const subs = await videoService.getSubscribe(video.owner?._id)
    // todo: dispatch to store

    console.log(subs.data)
    if(subs.data == "unsubscribe successully"){
      // setSubscribe(true)
      dispatch(unSubscribe())
    }else{
      dispatch(Subscribe(subs.data))
      // setSubscribe(false)
    }
   } catch (error) {
    console.log(error)
   }

  }

  return (
    <>
      <div className="video-container">
        <div className="grid grid-two-col-video mt-12">
          <div>
            <div className=" video flex justify-center ml-48">
              <video
                src={video.videoFile}
                controls
                autoPlay
                className="h-full w-full rounded-lg"
              ></video>
            </div>
            <div className="ml-48">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{video.title}</h1>
                  <p className="flex  text-sm text-gray-200">
                    {video.views} views . 18 hours ago
                  </p>
                </div>
                <button className="flex items-center gap-1 ">
                  <BiLike /> Like
                </button>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-x-4">
                  <div className="h-10 w-10 shrink-0">
                    <img
                      className="h-full w-full rounded-full "
                      src={video.owner?.avatar}
                      alt="channel avatar"
                    />
                  </div>
                  <div className="block">
                    <p className="text-green-200"> {video.owner?.userName}</p>
                    <p className="text-sm text-green-200">
                      {video.owner?.subscriberCount} Subscribers
                    </p>
                  </div>
                </div>

                <div className="block">
                  <button
                    onClick={handleSubscribe}
                    className="border-2 px-4 py-1 rounded-2xl"
                  >
                    {isSubscribe ? "unsubscribe" : "subscribe"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="yellow ml48"></div>
        </div>

        <div className="related-videos "></div>
      </div>
    </>
  );
};

export default Videos;
