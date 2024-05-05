import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subcribscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription

  if (!isValidObjectId(channelId)) {
    throw new ApiError(404, "channel id is missing");
  }

  const subscriberExist = await Subscription.findOne({
    channel: channelId,
    subscriber: new mongoose.Types.ObjectId(req.user?._id),
  });

  // console.log(subscriberExist)

  if (!subscriberExist) {
    const subscribed = await Subscription.create({
      channel: channelId,
      subscriber: req.user?._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, subscribed, " subscribe successully"));
  } else {
    const unsubscribe = await Subscription.findByIdAndDelete(subscriberExist);
    return res
      .status(200)
      .json(new ApiResponse(200, "unsubscribe successully"));
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(404, "channel id is missing");
  }

  const getSubscriber = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $project: {
        _id: "$subscriber._id",
      },
    },
    {
      $count: "totalSubscriber",
    },
  ]);

  // console.log(getSubscriber)

  return res
    .status(200)
    .json(
      new ApiResponse(200, getSubscriber, "subscriber fetched successfully")
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(404, "subscriber id is missing");
  }

  const getChannel = await Subscription.aggregate([
    {
      $match: { subscriber: new mongoose.Types.ObjectId(subscriberId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channelData",
      },
    },
    {
      $unwind: "$channelData",
    },
    
    {
      $project: {
        "channelData._id": 1,
        "channelData.userName": 1,
        "channelData.email": 1,
        "channelData.avatar": 1,

        // Add more fields as needed
      },
    },
  ]);

  // console.log(getChannel)

  return res
    .status(200)
    .json(new ApiResponse(200, getChannel, "channel featched successfully"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
