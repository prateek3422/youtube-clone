import   {useEffect, useState } from "react";
import { Loader, VideoCard } from "../components";
import videoService from "../services/VideoService";
import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";

const Home = () => {

  // const [query, setQuery] = useState("jjk");
  // console.log(video);

  const handleVideo = async() => {
    try {
      const videoData = await videoService.getAllVideos();
      // console.log(videoData.data.data)

      return videoData.data.data.docs
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, data:video} = useQuery({queryKey:["video"],queryFn:handleVideo});

  return isLoading ? <Loader /> : (
    <>
      <div className="container mx-auto">
        <div className="main  w-full">
          <div className="grid  grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            {video.map((vid) => (
              <li key={vid._id} className="list-none">
                <VideoCard {...vid} />
              </li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
