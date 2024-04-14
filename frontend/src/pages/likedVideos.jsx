import React from "react";
import videoService from "../services/VideoService";
import { useQuery } from "@tanstack/react-query";
import { Loader, VideoCard } from "../components";

const LikedVideos = () => {
  const handleLikeVideo = async () => {
    try {
      const LikeData = await videoService.LikedVideos();
      return LikeData;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, data: like } = useQuery({
    queryKey: ["Like"],
    queryFn: handleLikeVideo,
  });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="container mx-auto">
        <div className="main  w-full">
          <div className="grid  grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            {like?.map((vid) => {
              return (
                <li key={vid._id} className="list-none">
                  <VideoCard {...vid.video} />
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
};

export default LikedVideos;
