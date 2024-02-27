import axios from "axios";

export class VideoService {
  async getAllVideos() {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(
        `http://localhost:3000/api/v1/videos/getAllVideo/?page=1&limit=10`,config
      );

      // console.log(response.data.data);
      return response;
    } catch (error) {
      console.log("get all video error", error);
    }
  }

  async getSingeVideo(slug){
    // console.log(slug)
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(`http://localhost:3000/api/v1/videos/${slug}`, config)
      // console.log(response.data)
      return response.data
    } catch (error) {
      console.log("get video", error)
    }
  }

  async getSubscribe(channelId){
    // console.log(channelId)
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      }

      const response = await axios.post(`http://localhost:3000/api/v1/subscriptions/c/${channelId}`,{},config)
   
      // console.log(response)
      return response.data
    } catch (error) {
      console.log("toggle subscribe", error)
    }
  }
}

const videoService = new VideoService();

export default videoService;
