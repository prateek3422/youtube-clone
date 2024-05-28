import React from "react";
import { useQuery } from "@tanstack/react-query";
import videoService from "../services/VideoService";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/query-client";
import { Avatar } from "@mui/material";
import { Button } from "../components";
import { useSelector } from "react-redux";
import authService from "../services/auth";
import { Link } from "react-router-dom";
import getSubscribedChannelQuery from "../hooks/react-query/query/subscribe/getSubscribedChannelQuery";
import getSubscribeQuery from "../hooks/react-query/query/subscribe/getSubscribeQuery";
import getChannelQuery from "../hooks/react-query/query/channel/getChannelQuery";

const Subscribers = () => {
  const userData = useSelector((state) => state.auth.userData);

  const userId = userData.data?._id;
  const username = userData.data?.userName;

  const {data:channel} = getChannelQuery(username);
  const { data} = getSubscribedChannelQuery(userId);



  return (
    <div>
      <div>
        {data?.map((item) => {
          return (
            <div key={item?._id}>
              <Link to={`/channel/${username}`}>
                <div className=" px-4 py-4">
                  <div className="flex justify-between w-full mb-8">
                    <div className="flex items-center gap-x-2">
                      <Avatar
                        alt="channel avatar"
                        src={item?.channelData?.avatar}
                        sx={{ width: 56, height: 56 }}
                      />
                      <div className="block">
                        <h6 className="font-semibold">
                          {item?.channelData?.userName}
                        </h6>
                      </div>
                    </div>

                    <Button onClick={() => Subscribe()}>
                      {channel?.isSubscribed ? "unsubscribe" : "subscribe"}
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscribers;
