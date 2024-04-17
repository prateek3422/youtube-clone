
import videoService from "../services/VideoService";
import { useSelector } from "react-redux";
import authService from "../services/auth";
import {  ChannelComponent, Loader } from "../components";

import { useQuery } from "@tanstack/react-query";


const MyContent = () => {



 const userData = useSelector((state) => state.auth.userData);

 const authStatus = useSelector((state) => state.auth.status);
  

  const fetchedVideoData = async () => {
    try {
      const userId = userData.data?._id;
      const videoData = await videoService.getMyVideos(userId);
      return videoData.data?.data?.docs;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChannelData = async () => {
    try {
      const username = userData.data?.userName;
      const getChannelDetail = await authService.getChannelDetails(username);
      return getChannelDetail?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, data: myData } = useQuery({
    queryKey: ["video"],
    queryFn: fetchedVideoData,
  });

  const { data: channel } = useQuery({
    queryKey: ["channel"],
    queryFn: fetchChannelData,
  });

  

  return isLoading ? (
    <Loader />
  ) : (
    <>
   
      <ChannelComponent channel={channel}  myData={myData} userData={userData} authStatus={authStatus}/>
    </>
  );
};

export default MyContent;
