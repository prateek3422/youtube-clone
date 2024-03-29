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
      console.log("get all video error", error);
      // toast.error(res?.data?.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
    }
  }

  async publicVideo(videoFile, thubnail, title, description) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(
        `http://localhost:3000/api/v1/videos/publishVideo`,
        {
          videoFile,
          thubnail,
          title,
          description,
        },
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

  async toggleVideo(videoId){
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.patch(
        ` http://localhost:3000/api/v1/videos/toggle/publish/${videoId}`,{}, config
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
      // toast.error(res?.data?.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
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

  async getMyVideos(userId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const ourVideo = axios.get(
        `http://localhost:3000/api/v1/videos/getAllVideo/?page=1&limit=10&userId=${userId}`,
        config
      );
      // console.log(ourVideo)

      toast.success(ourVideo?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return ourVideo;
    } catch (error) {
      console.log(error);
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
      console.log("create comment", error);
    }
  }

  // playlist

  async createPlaylist(name, description) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const playlist = await axios.post(
        `http://localhost:3000/api/v1/playlists/`,
        {
          name: name,
          description: description,
        },
        config
      );

      toast.success(playlist?.data?.message, {
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
      console.log("create comment", error);
    }
  }

  async userplaylist(userId) {
    // console.log(userId)
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const playlist = await axios.get(
        `http://localhost:3000/api/v1/playlists/user/${userId}`,
        config
      );

      // toast.success(playlist?.data?.message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
      // console.log(commentres);
      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  }

  async playlistById(playlistId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const playlist = await axios.get(
        `http://localhost:3000/api/v1/playlists//user/${playlistId}`,
        {},
        config
      );

      toast.success(playlist?.data?.message, {
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
      console.log("create comment", error);
    }
  }

  async addVideoOnPlaylist(videoId, playlistId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const playlist = await axios.patch(
        `http://localhost:3000/api/v1/playlists/add/${videoId}/${playlistId}`,
        {},
        config
      );

      toast.success(playlist?.data?.message, {
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
      console.log("create comment", error);
    }
  }

  async removeVideoFromPlaylist(videoId, playlistId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const playlist = await axios.patch(
        `http://localhost:3000/api/v1/playlists/remove/${videoId}/${playlistId}`,
        {},
        config
      );

      toast.success(playlist?.data?.message, {
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
      console.log("create comment", error);
    }
  }

  async updatePlaylist(playlistId, name, description) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const playlist = await axios.patch(
        `http://localhost:3000/api/v1/playlists/user/${playlistId}`,
        {
          name,
          name,
          description: description,
        },
        config
      );

      toast.success(playlist?.data?.message, {
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
      console.log("create comment", error);
    }
  }

  async deletePlaylist(playlistId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const playlist = await axios.delete(
        `http://localhost:3000/api/v1/playlists/user/${playlistId}`,
        {},
        config
      );

      toast.success(playlist?.data?.message, {
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
      console.log("create comment", error);
    }
  }

  // like

  async getlikes() {

    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
    } catch (error) {
      console.log(error)
    }
  }

  // dashboard

  async channelStatus() {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };
      const dash = await axios.get(`http://localhost:3000/api/v1/dashboard/stats`,config)

      return dash
    } catch (error) {
      console.log(error)
    }
  }

  async channelVideo(){
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      };

      const video = await axios.get(`http://localhost:3000/api/v1/dashboard/videos`,config)

      return video
    } catch (error) {
      console.log(error)
    }
  }
}

const videoService = new VideoService();

export default videoService;
