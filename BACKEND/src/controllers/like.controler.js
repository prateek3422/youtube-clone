import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  //   console.log(videoId)

  if (!isValidObjectId(videoId)) {
    throw new ApiError(404, "video not found");
  }

  const isLike = await Like.findOne({
    video: videoId,
    likedBy: req.user?._id,
  });

  if (isLike) {
    const unLike = await Like.findByIdAndDelete(isLike._id);
    return res.status(200).json(new ApiResponse(200, unLike, "video unlike"));
  }

  const like = await Like.create({
    video: videoId,
    likedBy: req.user?._id,
  });

  // console.log(like)
  return res.status(200).json(new ApiResponse(200, like, "like successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment

  if (!commentId) {
    throw new ApiError(404, "comment id  is missing");
  }

  const iscommentLike = await Comment.find({
    comment: commentId,
    likedBy: req.user?._id,
  });

  if (iscommentLike) {
    const commentUnlike = await Comment.findByIdAndDelete(commentUnlike?._id);

    return res
      .status(200)
      .json(new ApiResponse(200, commentUnlike, "comment unlike succssfully"));
  }

  const commentLiked = await Comment.create({
    comment: commentId,
    likedBy: req.user?._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, commentLiked, "comment like successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on tweet

  if (!commentId) {
    throw new ApiError(400, "commentId is missing");
  }

  const isLike = await Like.findOne({
    comment: commentId,
    likedBy: req.user?._id,
  });

  if (isLike) {
    const unLike = await Like.findByIdAndDelete(isLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, unLike, "unlike successfully"));
  }

  const like = await Like.create({
    comment: commentId,
    likedBy: req.user?._id,
  });

  return res.status(200).json(new ApiResponse(200, like, "like successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const likedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
        pipeline:[
          {
            $lookup: {
              from:"users",
              localField:"owner",
              foreignField:"_id",
              as:"owner",
            }
          },
          {
            $addFields:{
              owner:{
                $first:"$owner"
              }
            }
          },

          {
            $project:{
              _id:1,
              title:1,
              videoFile:1,
              description:1,
              thumbnail:1,
              createdAt:1,
              views:1,
              
              owner:{
                _id:1,
                userName:1,
                fullname:1,
                avatar:1
              }
            }
          }
        ]
      },
    },

    {
      $addFields: {
        video: {
          $first: "$video",
        },
      },
    },
  ]);

  // console.log(likedVideos);

  if (!likedVideos) {
    throw new ApiError(400, "liked videos not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, likedVideos, "liked videos"));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
