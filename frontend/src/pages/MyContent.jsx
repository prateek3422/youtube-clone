
import videoService from "../services/VideoService";
import { useSelector } from "react-redux";
import authService from "../services/auth";
import {  ChannelComponent, Loader } from "../components";

import { useQuery } from "@tanstack/react-query";
import getChannelQuery from "../hooks/react-query/query/channel/getChannelQuery";
import getMyVideoQuery from "../hooks/react-query/query/channel/getMyVideoQuery";


const MyContent = () => {

 const userData = useSelector((state) => state.auth.userData);

 const authStatus = useSelector((state) => state.auth.status);
  

  const fetchedVideoData = async () => {
    try {
      const videoData = await videoService.getMyVideos(userId);
      return videoData.data?.data?.docs;
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const username = userData.data?.userName;
  const userId = userData.data?._id;
  const { data: channel } = getChannelQuery(username)
  const { isLoading, data: myData } = getMyVideoQuery(userId)

  

  return isLoading ? (
    <Loader />
  ) : (
    <>
   
      <ChannelComponent channel={channel}  myData={myData?.docs} userData={userData} authStatus={authStatus}/>
    </>
  );
};

export default MyContent;
