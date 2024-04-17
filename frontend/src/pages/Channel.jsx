import { useQuery } from "@tanstack/react-query";
import { ChannelComponent } from "../components";
import videoService from "../services/VideoService";
import authService from "../services/auth";
import { useParams } from "react-router-dom";

const Channel = () => {

  const { userName } = useParams();

  const fetchedChannel = async () => {
    try {
      const channelData = await authService.getChannelDetails(userName);
      return channelData.data.data;
    } catch (error) {
      console.log(error);
    }
  }



  const { isLoading, data: channel } = useQuery({
    queryKey: ["channel"],
    queryFn: fetchedChannel,
  })


  const fetchedVideoData = async () => {
    try {
      const userId = channel?._id;
      const videoData = await videoService.getMyVideos(userId);
      return videoData.data?.data?.docs;
    } catch (error) {
      console.log(error);
    }
  };

  const {  data: myData } = useQuery({
    queryKey: ["video"],
    queryFn: fetchedVideoData,
  });

  console.log(myData)
  
  return (
    <>
   <ChannelComponent channel={channel}  myData={myData}/> 
    </>
  )
}

export default Channel