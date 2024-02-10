import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  // get details from frontend
  // check all fields are valid or not
  // video and thumbnails file upload on cloudinary
  // res

  const { title, description } = req.body;

  console.log(req.body)
  // TODO: get video, upload to cloudinary, create video
  if ([title, description].some((field) => field?.trim() == "")) {
    throw new ApiError(401, "All filds are required");
  }

//   console.log(req.files)


  const videoLocalFilePath = req.files?.videoFile[0]?.path;
  const thumbnailFilePath = req.files?.thumbnail[0]?.path;

//   console.log(videoLocalFilePath)
  
  const thumbnail = await cloudinaryUpload(thumbnailFilePath);
  const videoFile = await cloudinaryUpload(videoLocalFilePath);

  if (!videoFile && !thumbnail) {
    throw new ApiError(500, "video and thumbnail field are required");
  }

  const duration = Math.floor(videoFile.duration);

  console.log(duration, videoFile.duration);

  const videos = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title,
    description,
    duration,
    owner: req.user,
  });

  if (!videos) {
    throw new ApiError(401, "something went worng while publishing video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "video publish successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
