import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comunity } from "../models/comunity.model.js";

const createComunity = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "content is required");
  }

  const comunity = await Comunity.create({
    content,
    owner: req.user._id,
  });

  if (!comunity) {
    throw new ApiError(400, "comunity not created");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comunity, "comunity created successfully"));
});

const getUserComunity = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(404, "user not found");
  }
  const getComunity = await Comunity.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        content: 1,
        owner: {
            userName:1,
            avatar:1,
            _id:1,
            fullname:1,
            email:1,
            createdAt:1

        },
      },
    },
  ]);

//   console.log(getComunity);

  return res.status(200).json(new ApiResponse(200, getComunity, "fetched comunity successfully"));
});

const updateComunity = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { comunityId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(comunityId)) {
    throw new ApiError(404, "comunity not found");
  }

  const comunity = await Comunity.findByIdAndUpdate(
    comunityId,
    {
        $set:{
            content
        }

    },{new:true}
  )

  if (!comunity) {
    throw new ApiError(400, "comunity not updated");
  }

  return res.status(200).json(new ApiResponse(200, comunity, "comunity updated successfully"));
});

const deleteComunity = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { comunityId } = req.params;

  if (!isValidObjectId(comunityId)) {
    throw new ApiError(404, "comunity not found");
  }

  const comunity = await Comunity.findById(comunityId);

  if (!comunity) {
    throw new ApiError(400, "comunity not deleted");
  }

  if(comunity?.owner.toString() !== req.user._id.toString()){
    throw new ApiError(400, "you are not authorized to delete this comunity");
  }

  const deletedComunity = await Comunity.findByIdAndDelete(comunityId);

  if(!deletedComunity){
    throw new ApiError(400, "comunity not deleted");
  }

  return res.status(200).json(new ApiResponse(200, deletedComunity, "comunity deleted successfully"));
});

export { createComunity, getUserComunity, deleteComunity, updateComunity };
