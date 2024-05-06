
import { toast } from "react-toastify";
import { api } from "./axios";

export class VideoService {
  async getAllVideos() {
    try {
      const response = await api({
        url: `/api/v1/videos/getAllVideo/?page=1&limit=10`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
  

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

  async publishVideo(data) {
    try {
      const response = await api({
        url: `api/v1/videos/publishVideo`,
        method: "post",
        data,
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response);
      toast.error(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return response.data;
    } catch (error) {
      console.log("publish video", error);
    }
  }

  async getSingeVideo(slug) {
    // console.log(slug)
    try {
      const response = await api({
        url: `/api/v1/videos/${slug}`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log("get video", error);
      toast.error(error?.message, {
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

  async toggleVideo(videoId) {
    try {
      const response = await api({
        url: `api/v1/videos/toggle/publish/${videoId}`,
        method: "patch",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(response.data)
      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return response.data;
    } catch (error) {
      console.log("get video", error);
      toast.error(error?.message, {
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

  async deleteVideo(videoId) {
    try {
      const response = await api({
        url: `api/v1/videos/${videoId}`,
        method: "delete",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return response.data;
    } catch (error) {
      console.log(error);
      toast.success(error?.message, {
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

  async updateVideo(data, videoId) {
    try {
      const response = await api({
        url: `/api/v1/videos/${videoId}`,
        method: "patch",
        data,
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log("update video", error);
      toast.success(error?.message, {
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
      const response = await api({
        url: `/api/v1/subscriptions/c/${channelId}`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });

      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // console.log(response)
      return response.data;
    } catch (error) {
      console.log("toggle subscribe", error);
      toast.success(error?.message, {
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

  async getMyVideos(userId) {
    try {
      const ourVideo = await api({
        url: `/api/v1/videos/getAllVideo/?page=1&limit=10&userId=${userId}`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
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

  async getSubscribedChannels(subscriberId) {
    try {
      const channel = await  api({
        url: `/api/v1/subscriptions/u/${subscriberId}`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(ourVideo)

      toast.success(channel?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      return channel;
    } catch (error) {
      console.log(error);
    }
  }

  // comment

  async getVideoComments(videoId) {
    try {
      const response = await api({
        url: `/api/v1/comments/${videoId}`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(ourVideo)

      return response.data;
    } catch (error) {
      console.log("get comment", error);
    }
  }

  async createComment(videoId, comment) {
    try {
      const response =await api({
        url: `/api/v1/comments/${videoId}`,
        method: "post",
        content: comment,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(ourVideo)

      toast.success(response?.data?.message, {
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
      return response;
    } catch (error) {
      console.log("create comment", error);
    }
  }

  async deleteComment(commentId) {
    try {
      const commentres = await api({
        url: `/api/v1/comments/c/${commentId}`,
        method: "delete",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(ourVideo)

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

  async updateComment(commentId, comment) {
    try {
      const commentres = await api({
        url: `/api/v1/comments/c/${commentId}`,
        method: "put",
        content: comment,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(ourVideo)

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

      return commentres;
    } catch (error) {
      console.log("create comment", error);
    }
  }

  // playlist

  async createPlaylist(data) {
    try {
      const playlist =await  api({
        url: `/api/v1/playlists/`,
        method: "post",
        name: data.title,
        description: data.description,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(ourVideo)

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
      return playlist;
    } catch (error) {
      console.log("create playlist", error);
    }
  }

  async userplaylist(userId) {
    // console.log(userId)
    try {
      const playlist = await  api({
        url: `/api/v1/playlists/user/${userId}`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      //  // console.log(ourVideo)

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
      // const playlist = await axios.get(
      //   `http://localhost:3000/api/v1/playlists/user/${userId}`,
      //   {
      //   headers:{
      //        "content-type": "application/json",
      //        accept: "application/json",
      //      },
      //      withCredentials: true,
      //      }
      // );
      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  }

  async playlistById(playlistId) {
    try {
      const playlist = await api({
        url: `/api/v1/playlists/user/${playlistId}`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // console.log(commentres);
      return playlist;
    } catch (error) {
      console.log("create comment", error);
    }
  }

  async addVideoOnPlaylist(videoId, playlistId) {
    try {
      const playlist = await api({
        url: `/api/v1/playlists/add/${videoId}/${playlistId}`,
        method: "patch",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // const playlist = await axios.patch(
      //   `http://localhost:3000/api/v1/playlists/add/${videoId}/${playlistId}`,
      //   {},
      //   config
      // );

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
      return playlist;
    } catch (error) {
      console.log("create comment", error);
    }
  }

  async removeVideoFromPlaylist(videoId, playlistId) {
    try {
      const playlist = await api({
        url: `/api/v1/playlists/remove/${videoId}/${playlistId}`,
        method: "patch",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // const playlist = await axios.patch(
      //   `http://localhost:3000/api/v1/playlists/remove/${videoId}/${playlistId}`,
      //   {},
      //   config
      // );

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
      return playlist;
    } catch (error) {
      console.log("create comment", error);
    }
  }

  async updatePlaylist(playlistId, name, description) {
    try {
      const playlist = await  api({
        url: `/api/v1/playlists/user/${playlistId}`,
        method: "patch",
        name,
        description: description,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // const playlist = await axios.patch(
      //   `http://localhost:3000/api/v1/playlists/user/${playlistId}`,
      //   {
      //     
      //     name,
      //     description: description,
      //   },
      //   config
      // );

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
      return playlist;
    } catch (error) {
      console.log("create comment", error);
    }
  }

  async deletePlaylist(playlistId) {
    try {
      const playlist = await  api({
        url: `/api/v1/playlists/user/${playlistId}`,
        method: "delete",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // const playlist = await axios.delete(
      //   `http://localhost:3000/api/v1/playlists/user/${playlistId}`,
      //   {},
      //   config
      // );

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
      return playlist;
    } catch (error) {
      console.log("create comment", error);
    }
  }

  // like

  async ToggleVideolikes(videoId) {
    try {
      const res = await api({
        url: `/api/v1/likes/toggle/v/${videoId}`,
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });

      // const res = await axios.post(
      //   `http://localhost:3000/api/v1/likes/toggle/v/${videoId}`,
      //   {},
      //   config
      // );

      return res;
    } catch (error) {
      console.log(error);
    }
  }
  async ToggleCommentlikes(videoId) {
    try {
       const res = await api({
        url: `/api/v1/likes/toggle/v/${videoId}`,
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });


      // const res = await axios.post(
      //   `http://localhost:3000/api/v1/likes/toggle/v/${videoId}`,
      //   {},
      //   config
      // );

      return res;
    } catch (error) {
      console.log(error);

      console.log(error);
    }
  }

  async LikedVideos() {
    try {
      const res = await api({
        url: `/api/v1/likes/videos`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  // dashboard

  async channelStatus() {
    try {
      const dash = await api({
        url: `/api/v1/dashboard/stats`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      return dash;
    } catch (error) {
      console.log(error);
    }
  }

  async channelVideo() {
    try {
      const video = await api({
        url: `/api/v1/dashboard/videos`,
        method: "get",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      });
      // const video = await axios.get(
      //   `http://localhost:3000/api/v1/dashboard/videos`,
      //   config
      // );

      return video;
    } catch (error) {
      console.log(error);
    }
  }
}

const videoService = new VideoService();

export default videoService;
