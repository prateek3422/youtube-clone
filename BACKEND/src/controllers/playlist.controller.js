import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //TODO: create playlist
  // console.log(title)

  if (!name && !description) {
    throw new ApiError(400, "name or description are required");
  }

  console.log(name, description)

  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user?._id,
  });

  // console.log(playlist)
  if (!playlist) {
    throw new ApiError(500, "something went wrong while creating playlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists
  // console.log(userId);

  if (!isValidObjectId(userId)) {
    throw new ApiError(404, "user is missing");
  }
  const playlist = await Playlist.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) },
    },
  ]);
  // console.log(playlist);
  
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, " user playlist fetched successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  //   console.log(playlistId)

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(404, "playlist is missing");
  }

  const playlist = await Playlist.findById(playlistId);

  console.log(playlist);
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "playlist created successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  //   console.log(videoId)
  //   console.log(playlistId)

  if (!playlistId && !videoId) {
    throw new ApiError(404, "playlist is missing");
  }

  const videos = await Video.findById(videoId);

  if (!videos) {
    throw new ApiError(404, "video not found ");
  }

//   console.log(videos);

const playlist = await Playlist.findById(playlistId)

if(playlist.videos.includes(videoId)){
    throw new ApiError(400, "video already exists")
}

  const addVideoPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $push: {
        videos,
      },
    },
    {
      new: true,
    }
  );

//   console.log(addVideoPlaylist);

  return res
    .status(200)
    .json(new ApiResponse(200, addVideoPlaylist, "video added in playlist"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist
  if (!playlistId && !videoId) {
    throw new ApiError(404, "playlist is missing");
  }

  const videos = await Video.findById(videoId);

  if (!videos) {
    throw new ApiError(404, "video not found ");
  }

  const removeVideoPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $unset: {
        videos:1
      },
    },
    {
      new: true,
    }
  );

  
  return res
    .status(200)
    .json(new ApiResponse(200, removeVideoPlaylist, "video removed from playlist"));

});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist
  if (!playlistId) {
    throw new ApiError(404, "playlist is missing");
  }

  const deletePlaylist = await Playlist.findByIdAndDelete(playlistId)

  return res
  .status(200)
  .json(new ApiResponse(200, deletePlaylist, " playlist deleted"));

});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (!playlistId) {
    throw new ApiError(404, "playlist is missing");
  }


  if(!name & !description){
    throw new ApiError(404, "All field are required");
  }

  const updatePlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set:{
        name,
        description
      }
    },
    {
      new: true,
    }
  );

  
  return res
    .status(200)
    .json(new ApiResponse(200, updatePlaylist, "video removed from playlist"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
