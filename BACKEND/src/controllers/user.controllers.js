import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryUpload } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // first get user
  // check user email alredy exist or not
  // if user email exist retun without register in database
  // if user not exist then check password and email vlidated or not
  // after checking validation save the user in database

  const { userName, fullname, email, password } = req.body;

  if (
    [userName, fullname, email, password].some((filds) => filds.trim() == "")
  ) {
    throw new ApiError(409, "All filds are required");
  }

  const userExist = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (userExist) {
    throw new ApiError(409, "user");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar fild are required ");
  }

  const avatar = await cloudinaryUpload(avatarLocalPath);
  const coverImage = await cloudinaryUpload(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar fild are required");
  }

  const user = await User.create({
    userName,
    email,
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went worng while registing user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

export { registerUser };
