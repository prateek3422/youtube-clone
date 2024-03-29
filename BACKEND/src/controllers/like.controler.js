import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  //   console.log(videoId)

  if (!isValidObjectId(videoId)) {
    throw new ApiError(404, "video not found");
  }

  const isLike = await Like.find({
    video: videoId,
    likedBy: req.user._id,
  });

  // console.log(isLike);

  if (isLike) {
    const unLike = await Like.findByIdAndDelete(isLike._id);
    return res.status(200).json(new ApiResponse(200, unLike, "video unlike"));
  }

  const like = await Like.create({
    video: videoId,
    likedBy: req.user._id,
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
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const likedVideos = await Like.aggregate([
    {
      $match:{likedBy : new mongoose.Types.ObjectId(req.user?._id)}
    },
    
  ])

  console.log(likedVideos)


  
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
