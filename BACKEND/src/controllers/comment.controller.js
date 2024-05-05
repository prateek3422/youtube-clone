import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video

  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiError(404, "video not found");
  }

  const aggregate = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              userName: 1,
              fullname: 1,
              avatar: 1,
            },
          },
        ],
      },
    },

    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
  ]);

  const comment = await Comment.aggregatePaginate(aggregate, {
    page,
    limit,
  });

  // console.log(comment);

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment featched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;

  // console.log(content);

  if (!content) {
    throw new ApiError(404, "content is missing");
  }

  if (!videoId) {
    throw new ApiError(404, "video not found");
  }

  const comment = await Comment.create({
    content: content,
    video: videoId,
    owner: req.user?._id,
  });

  if (!comment) {
    throw new ApiError(400, "something went wrong while creating a comment");
  }

  // console.log(comment);

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "comment created successfully"));
});
const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  const { content } = req.body;

  if (!commentId) {
    throw new ApiError(404, "comment id missing");
  }

  if (!content) {
    throw new ApiError(404, "content is missing");
  }

  const commentUpdate = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  // console.log(commentUpdate)

  return res
    .status(200)
    .json(new ApiResponse(200, commentUpdate, "comment updated"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(404, "comment id missing");
  }

  const deleteComment = await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, deleteComment, "comment delete successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
