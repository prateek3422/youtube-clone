import axios from "axios";
import { toast } from "react-toastify";

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
        `http://localhost:3000/api/v1/videos/getAllVideo/?page=1&limit=10`,
        config
      );
      // toast.success(response?.data?.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      // console.log(response.data);
      return response;
    } catch (error) {
      // console.log("get all video error", error);
      toast.error(res?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  async getSingeVideo(slug) {
    // console.log(slug)
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(
        `http://localhost:3000/api/v1/videos/${slug}`,
        config
      );
      // console.log(response.data)
      // toast.success(response?.data?.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      return response.data;
    } catch (error) {
      console.log("get video", error);
      toast.error(res?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  //subscribe
  async getSubscribe(channelId) {
    // console.log(channelId)
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        `http://localhost:3000/api/v1/subscriptions/c/${channelId}`,
        {},
        config
      );

      // console.log(response)
      return response.data;
    } catch (error) {
      console.log("toggle subscribe", error);
    }
  }

  // comment

  async getVideoComments(videoId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(
        `http://localhost:3000/api/v1/comments/${videoId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log("get comment", error);
    }
  }

  async createComment(videoId, comment) {
    // console.log(comment);
    // console.log(videoId);
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const commentres = await axios.post(
        `http://localhost:3000/api/v1/comments/${videoId}`,
        { content: comment },
        config
      );

      toast.success(commentres?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // console.log(commentres);
      return commentres;
    } catch (error) {
      console.log("create comment",error)
    }
  }
}

const videoService = new VideoService();

export default videoService;
