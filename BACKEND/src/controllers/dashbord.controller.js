// import mongoose from "mongoose"
// import {Video} from "../models/video.model.js"
// import {Like} from "../models/like.model.js"
// import {ApiResponse} from "../utils/ApiResponse.js"
import mongoose from "mongoose";
import { Subscription } from "../models/subcribscription.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers,  total likes etc.
  const userId = req.user._id;
  // console.log(userId)

  const totalSubcriber = await Subscription.aggregate([
    {
      $match: { channel: new mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: null,
        totalSubcriberCount: { $sum: 1 },
      },
    },
  ]);

  // console.log(totalSubcriber);

  const video = await Video.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
  {
    $project:{
      likes:1,
      views:1,
      totalVideos:1
    }
  },
    {
      $group: {
          _id: null,
          totalLikes: {
              $sum: "$likes"
          },
          totalViews: {
              $sum: "$views"
          },
          totalVideos: {
              $sum: 1
          }
      }
  }
  ]);


  const getChannelStats = {

    totalSubcribers:totalSubcriber[0]?.totalSubcriberCount||0,
    totalLikes: video[0]?.totalLikes ||0,
    totalViews: video[0]?.totalViews ||0,
    totalVideos: video[0]?.totalVideos||0
  }

  return res
  .status(200)
  .json(
      new ApiResponse(
          200,
          getChannelStats,
          "channel stats fetched successfully"
      )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const userid = req.user?._id

 
  if(!userid){
    throw new ApiError(401, "unauthorized token")
  }

  const video = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userid)
      }
    },
    {
      $lookup:{
        from:"likes",
        foreignField:"video",
        localField:"_id",
        as:"likes"
      },
    },
    {
      $addFields: {
          createdAt: {
              $dateToParts: { date: "$createdAt" }
          },
      }
  },
  {
    $project:{
      videoFile:1,
      thumbnail:1,
      title:1,
      description:1,
      duration:1,
      createdAt:{
        day:1,
        month:1,
        year:1
      },
      isPublished:1
    }
  }
  ])

  console.log(video)
  return res
  .status(200)
  .json(
      new ApiResponse(
          200,
          video,
          "channel stats fetched successfully"
      )
  );
});



export { getChannelStats, getChannelVideos };
