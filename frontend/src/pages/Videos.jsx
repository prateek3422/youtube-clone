import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import videoService from "../services/VideoService";
import { BiLike } from "react-icons/bi";
import { Button, CommentSection, VideoPlayer } from "../components";


const Videos = () => {

  const { slug } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({});


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

  // subscription

  const handleSubscribe = async () => {
    try {
      const subs = await videoService.getSubscribe(video.owner?._id);
      // todo: dispatch to store

      
    } catch (error) {
      console.log(error);
    }
  };

  // Comment




  return (
    <>
      <div className="container mx-auto">
        <div className="flex w-full flex-wrap lg:flex-nowrap gap-4 p-4">
          <div>
            <div className=" video flex justify-center  lg:ml-32">
              <video
                src={video.videoFile}
                controls
                autoPlay
                className="h-full w-full rounded-lg"
              ></video>

               {/* <VideoPlayer src={video.videoFile}/> */}
            </div>
            <div className=" mt-4 rounded-xl p-4  lg:ml-32">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{video.title}</h1>
                  <p className="flex  text-sm text-gray-200">
                    {video.views} views . 18 hours ago
                  </p>
                </div>
                <Button className=" px-4 py-1 rounded-2xl flex items-center gap-1 text-white">
                  <BiLike /> 350
                </Button>
              </div>

              <div className=" mt-4 flex justify-between items-center">
                <div className="flex gap-x-4">
                  <div className="h-10 w-10 shrink-0">
                    <img
                      className="h-full w-full rounded-full "
                      src={video.owner?.avatar}
                      alt="channel avatar"
                    />
                  </div>
                  <div className="block">
                    <Link to={``}>
                    <p className="text-green-200"> {video.owner?.userName}</p>
                    </Link>
                    <p className="text-sm text-green-200">
                      {video.owner?.subscriberCount} Subscribers
                    </p>
                  </div>
                </div>

                <div className="block">
                  <Button
                    onClick={handleSubscribe}
                    className=" px-4 py-1 rounded-2xl text-white"
                  >
                    {video.owner?.isSubscribed ? "unsubscribe" : "subscribe" }
                  </Button>
                </div>
              </div>
              {/* <hr className="my-4 border-white" /> */}

              <div className="h-10 overflow-hidden group-focus:h-auto my-4">
                <p className="text-sm text-white">{video.description}</p>
              </div>



            </div>
              {/* ===============comment section========== */}

              <CommentSection slug={slug}/>

          </div>

          <div className="related-videos  w-full">

            related videos
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
