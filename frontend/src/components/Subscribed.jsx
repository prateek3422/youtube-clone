import React from "react";
import { useQuery } from "@tanstack/react-query";
import videoService from "../services/VideoService";
import Button from "./Button";
import { useMutation} from "@tanstack/react-query";
import { queryClient } from "../utils/query-client";

const Subscribed = ({ userId, channel} ) => {


  const fetchedChannels = async () => {
    try {
      const res = await videoService.getSubscribedChannels(userId);

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const subs = await videoService.getSubscribe(userId);
      // todo: dispatch to store

      return subs;
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery({
    queryKey: ["subscribedChannels"],
    queryFn: fetchedChannels,
  });

  const { mutate: Subscribe } = useMutation({
    mutationFn: handleSubscribe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribedChannels"] });
    },
  });

  return (
    <div>
      <div>
        {data?.map((item) => {
          return (
            <div key={item?._id}>
              <div className=" px-4 py-4">
              <div className="flex justify-between w-full mb-8">
                <div className="flex items-center gap-x-2">
                  <div className="h-16 w-16 shrink-0">
                    <img
                      className="h-full w-full rounded-full "
                      src={item?.channelData?.avatar}
                      alt="avatar"
                    />
                  </div>
                  <div className="block">
                    <h6 className="font-semibold">
                      {item?.channelData?.userName}
                    </h6>
                  </div>
                </div>

                <Button   onClick={() => Subscribe()}>
                {channel?.isSubscribed ? "unsubscribe" : "subscribe"}
              </Button>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscribed;
