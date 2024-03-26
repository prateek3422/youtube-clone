import React, { useEffect, useState } from "react";
import videoService from "../services/VideoService";
import { FaRegEye } from "react-icons/fa6";
import { Button, Modal } from "../components";

const Customise = () => {
  const [detail, setDetail] = useState({});
  const [video, setVideo] = useState([]);

  // console.log(detail);
  console.log(video);

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

const handlePublish =() =>{

}

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

              <p className="text-3xl font-semibold"> {detail.totalViews}</p>
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

              <p className="text-3xl font-semibold"> {detail.totalLikes}</p>
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

              <p className="text-3xl font-semibold">
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
          return(
            <>

            <div key={item._id} className="grid grid-cols-4 justify-between items-center border-2 h-12 rounded-lg mt-4 ml-4 mr-20 gap-1 ">
            <div className=" flex justify-center items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={handlePublish}/>
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                 {item.isPublished?"publish" : "unpublish"}
                </span>
              </label>
            </div>
            <div className="  flex justify-center items-center text-white ">{item.title}</div>
            <div className=" flex justify-center items-center text-white">{item.likes.length }</div>
            <div className="flex justify-center items-center text-white">{`${item.createdAt.day}/${item.createdAt.month}/${item.createdAt.year}`}</div>
          </div>
          </>
            )
        })}
      </div>
    </>
  );
};

export default Customise;
