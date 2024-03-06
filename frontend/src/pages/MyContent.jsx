import React, { useEffect, useState } from "react";
import videoService from "../services/VideoService";
import { useSelector } from "react-redux";
import authService from "../services/auth";

const MyContent = () => {
  const [myData, setMyData] = useState({});
  const [channel, setChannel] = useState({});
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData.data?.userName);

  console.log(channel);

  useEffect(() => {
    (async () => {
      try {
        const userId = userData.data?._id;
        const videoData = await videoService.getMyVideos(userId);
        setMyData(videoData.data?.data?.docs);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const username = userData.data?.userName;
        const getChannelDetail = await authService.getChannelDetails(username);
        // console.log(getChannelDetail.data.data)
        setChannel(getChannelDetail.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="container">
        <div className="coverImg">
          {channel?.coverImage ? (
            <img src={channel?.coverImage} alt="cover Image" />
          ) : (
            ""
          )}
        </div>

        <div className="px-2 pb-2">
          <div className="flex flex-wrap gap-4 pb-4 pt-6">
            <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
              <img
                className="w-full h-full"
                src={channel?.avatar}
                alt="channel avatar"
              />
            </span>

            <div className="mr-auto inline-block">
              <h1 className="text-xl">{channel?.fullname}</h1>
              <p className="text-sm text-gray-400">{channel?.userName}</p>
              <p className="text-sm text-gray-400">
                subscriber {channel?.subcribersCount} . subscribed{" "}
                {channel?.channelSubscribedToCount}
              </p>
            </div>
            <div className="inline-block">
              <button className="border-2 px-4 py-1 rounded-2xl">
                {channel?.isSubscribed ? "unsubscribe" : "subscribe"}
              </button>
            </div>
          </div>
          <ul className="no-scrollbar sticky top-[66px] z-2 overflow-auto border-b-2 border-gray-400 py-2 flex justify-between items-center ">
            <li className="w-full">
              <button className="w-full border-r-2  bg-white px-3 py-1.5 text-#ae7aff">
                Videos
              </button>
            </li>
            <li className="w-full">
              <button className="w-full border-r-2  bg-white px-3 py-1.5 text-#ae7aff">
                Playlist
              </button>
            </li>
            <li className="w-full">
              <button className="w-full border-r-2  bg-white px-3 py-1.5 text-#ae7aff">
                Comunity
              </button>
            </li>
            <li className="w-full">
              <button className="w-full   bg-white px-3 py-1.5 text-[#ae7aff]">
                Subscribed
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyContent;
