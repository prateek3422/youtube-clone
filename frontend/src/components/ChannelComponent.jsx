import { Avatar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "./videoCard";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PlaylistCard from "./PlaylistCard";
import Comunity from "./comunity";

const ChannelComponent = ({channel, myData,userData,authStatus = false,}) => {

  const [value, setValue] = useState("video");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container px-4">
        <div className="coverImg">
          {channel?.coverImage ? (
            <img src={channel?.coverImage} alt="cover Image" />
          ) : (
            ""
          )}
        </div>

        <div className="px-2 pb-2">
          <div className="flex flex-wrap gap-4 pb-4">
            <Avatar
              alt="channel avatar"
              src={channel?.avatar}
              sx={{ width: 80, height: 80 }}
            />
            <div className="mr-auto inline-block">
              <h1 className="text-xl">{channel?.fullname}</h1>
              <p className="text-sm text-gray-400">{channel?.userName}</p>
              <p className="text-sm text-gray-400">
                subscriber {channel?.subcribersCount} . subscribed{" "}
                {channel?.channelSubscribedToCount}
              </p>
            </div>
            <div className="inline-block">
              <button className="border-2 px-4 py-1 rounded-2xl text-white">
                {channel?.isSubscribed ? "unsubscribe" : "subscribe"}
              </button>
            </div>
            {authStatus && (
              <Link to="/customise">
                <button className="border-2 px-4 py-1 rounded-2xl text-white">
                  customise
                </button>
              </Link>
            )}
          </div>

          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="video" label="video" sx={{ color: "white" }} />
              <Tab value="playlist" label="playlist" sx={{ color: "white" }} />
              <Tab value="comunity" label="comunity" sx={{ color: "white" }} />
              {
                authStatus &&
                <Tab value="edit" label="edit" sx={{ color: "white" }}/>
              }
            </Tabs>
          </Box>
        </div>

        <div className={value === "video" ? "block" : "hidden"}>
          <div className="main  w-full mt-4 ">
            <div className="flex flex-col justify-center items-center">
              <div className="grid grid-cols-3 gap-4">
                {myData?.map((vid) => {
                  return (
                    <li key={vid?._id} className="list-none">
                      <VideoCard {...vid} />
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={value === "playlist" ? "block" : "hidden"}>
          <div className="main  w-full mt-4 ">
            <div className="grid grid-cols-3 gap-4">
              {/* {<h1>comming soon ...</h1>} */}
              <PlaylistCard userId={userData?.data?._id} />
            </div>
          </div>
        </div>
        <div className={value === "comunity" ? "block" : "hidden"}>
          <div className="main  w-full mt-4 ">
            <div className="grid grid-cols-3 gap-4">
              {<h1>comming soon....</h1>}
              {/* <Comunity /> */}
            </div>
          </div>
        </div>
        {/* <div className={value === "edit" ? "block" : "hidden"}>
          <div className="main  w-full mt-4 ">
                <EditUser/>
          </div>
        </div>  */}
      </div>
    </>
  );
};

export default ChannelComponent;
