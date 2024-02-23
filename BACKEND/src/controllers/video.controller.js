import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload, clouldinaryDelete } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  const pipeline = [];

  if (query) {
    pipeline.push({
      $match: {
        title: {
          $regex: query,
          $options: "i",
        },
      },
    });
  }
  // console.log(userId);

  if (userId) {
    pipeline.push({
      $match: {
        owner: req.user._id,
      },
    });
  }

  pipeline.push({
    $match: { isPublished: true },
  });

  if (sortBy) {
    pipeline.push({
      $sort: { [sortBy]: sortType == "asc" || 1 },
    });
  }

  const aggregate = Video.aggregate(pipeline);

  const video = await Video.aggregatePaginate(aggregate, {
    page,
    limit,
  });

  res
    .status(200)
    .json(new ApiResponse(200, video, "video feached successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  // get details from frontend
  // check all fields are valid or not
  // video and thumbnails file upload on cloudinary
  // res

  const { title, description } = req.body;

  // TODO: get video, upload to cloudinary, create video
  if ([title, description].some((field) => field?.trim() == "")) {
    throw new ApiError(401, "All filds are required");
  }

  // console.log(req.files)

  const videoLocalFilePath = req.files?.videoFile[0]?.path;
  const thumbnailFilePath = req.files?.thumbnail[0]?.path;
  console.log(thumbnailFilePath);

  //   console.log(videoLocalFilePath)

  const thumbnail = await cloudinaryUpload(thumbnailFilePath);
  const videoFile = await cloudinaryUpload(videoLocalFilePath);

  if (!videoFile && !thumbnail) {
    throw new ApiError(500, "video and thumbnail field are required");
  }

  const duration = Math.floor(videoFile.duration);

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
  // console.log(videoId)

  if (!videoId?.trim()) {
    throw new ApiError(400, "video id is missing");
  }

 // console.log(video)

 const videoById = await Video.findById(videoId)
//  console.log(videoById)

  const video = await Video.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(videoId) },
    },
    {
      $lookup:{
        from:"users",
        localField:"owner",
        foreignField:"_id",
        as:"owner",
      
        pipeline:[
          {
            $lookup:{
              from:"subscriptions",
              localField:"_id",
              foreignField:"channel",
              as:"subscribers",
            }
          },
          {
            $addFields:{
              subscriberCount:{$size:"$subscribers"}
            }
          },
          {
            $project:{
              userName:1,
              fullname:1,
              avatar:1,
              subscriberCount:1
            }
          }
        ],
        
      },
     
    },
    {
      $addFields:{
        owner:{
          $first:"$owner"
        }
      }
    },


  ]);



  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "please login ");
  }
  // console.log(user)

  user.watchhistory.push(videoId);
  await user.save({ validateBeforeSave: false });

  videoById.views += 1;
  const view = await videoById.save({ validateBeforeSave: false });

  if (!view) {
    throw new ApiError(400, "somethin went wrong while updating views");
  }



  // console.log(video)

  return res
    .status(200)
    .json(new ApiResponse(200, video[0], "video by id feched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail

  const { title, description } = req.body;

  if (!videoId?.trim()) {
    throw new ApiError(400, "videoId is missing");
  }

  const thumbnailFilePath = req.file?.path;

  console.log(thumbnailFilePath);

  if (!thumbnailFilePath) {
    throw new ApiError(400, "thumbnail file is missig");
  }

  const thumbnail = cloudinaryUpload(thumbnailFilePath);

  if (!thumbnail) {
    throw new ApiError(400, "somethin went worng while uploading thumbnail");
  }
  console.log(thumbnail);

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnail?.url,
      },
    },
    { new: true }
  );
  console.log(video.thumbnail);

  if (!video) {
    throw new ApiError(404, "video is not find");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video update successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  const video = await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video delete successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(404, "video Id is missing");
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: { isPublished: !video?.isPublished },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, isPublished, "video toggled"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
