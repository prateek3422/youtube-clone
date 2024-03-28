import React, { useEffect, useState } from "react";
import videoService from "../services/VideoService";
import { FaRegEye } from "react-icons/fa6";
import { Button, Modal, UserVideoDetails } from "../components";

const Customise = () => {
  const [detail, setDetail] = useState({});
  const [video, setVideo] = useState([]);
 
  // console.log(publish)
  // console.log(detail);
  // console.log(video);

  useEffect(() => {
    (async () => {
      try {
        const stats = await videoService.channelStatus();
        if (stats) {
          setDetail(stats.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const stats = await videoService.channelVideo();
        if (stats) {
          setVideo(stats.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  

  return (
    <>
      <div className="container">
        <div className=" flex flex-wrap justify-between gap-4 mx-4 mt-8">
          <div className="block">
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          </div>
          <div className="">
            {/* <Button>upload video</Button> */}
            <Modal />
          </div>
        </div>
        <div className="grid grid-cols-3 mt-11 h-36 w-11/12 gap-4 mx-4 ">
          <div className="rounded-lg  border-2  border-solid h-full  w-full">
            <div className="p-4">
              <div className="mb-4">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                  <FaRegEye />
                </span>
              </div>
              <h6 className="text-gray-300"> Total Views</h6>

              <p className="text-3xl text-white font-semibold"> {detail.totalViews}</p>
            </div>
          </div>

          <div className=" rounded-lg border-2 border-solid h-full w-full">
            <div className="p-4">
              <div className="mb-4">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                  <FaRegEye />
                </span>
              </div>
              <h6 className="text-gray-300"> Total likes</h6>

              <p className="text-3xl text-white font-semibold"> {detail.totalLikes}</p>
            </div>
          </div>

          <div className="  rounded-lg border-2  border-solid h-full w-full">
            <div className="p-4">
              <div className="mb-4">
                <span className="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                  <FaRegEye />
                </span>
              </div>
              <h6 className="text-gray-300"> Total subscriber</h6>

              <p className="text-3xl text-white font-semibold">
                {" "}
                {detail.totalSubcribers}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 justify-between items-center border-2 h-12 rounded-lg mt-4 ml-4 mr-20 ">
          <div className="flex justify-center items-center">
            <h2 className="text-white">status</h2>
          </div>

          <div className="flex justify-center items-center">
            <h2 className="text-white">uploaded</h2>
          </div>

          <div className="flex justify-center items-center">
            <h2 className="text-white">rating</h2>
          </div>

          <div className="flex justify-center items-center">
            <h2 className="text-white">uploaded date</h2>
          </div>
        </div>

        {video.map((item) => {
          // console.log(item)
          return (
            <UserVideoDetails item = {item } key={item?._id}/>
          )
        })}
      </div>
    </>
  );
};

export default Customise;
