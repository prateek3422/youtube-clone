import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinaryUpload } from "../utils/fileUpload.js";
import { ApiResponse } from "../utils/apiResponse.js";

const genrateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById({ userId });
  try {
    const accessToken = await user.createAccessToken();
    const refreshtoken = await user.createRefreshToken();

    user.refreshtoken = refreshtoken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshtoken };
  } catch (error) {
    throw new ApiError(401, "somthing went wrong while genrating token");
  }
};

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

  //   todo: add more validation

  if (userExist) {
    throw new ApiError(409, "user already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //   const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

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

const loginUser = asyncHandler(async () => {
  // get email and password from frontEnd
  // check emal exist or not
  // check password is correct or not
  // if password is correct generate access token and refresh token and set in cookies
  //res

  const { userName, email, password } = req.body;

  if (!(userName || email)) {
    throw new ApiError(400, "userName or email are required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "userName or email are not exist");
  }

  const isPaswordMatch = await user.isCorrectPassword(password);

  if (!isPaswordMatch) {
    throw new ApiError(401, "invalid credentials");
  }

  const { refreshtoken, accessToken } = await genrateAccessAndRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  const option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshtoken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken,
          refreshtoken,
        },
        "userlogin successfully"
      )
    );
});

const logoutUser = asyncHandler(async () => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshtoken: undefined,
      },
    },
    {
      new: true,
    }
  );

  
  const option = {
    httpOnly: true,
    secure: true,
  };

  res.status(201)
  .cookie("accessToken", option)
  .cookie("refreshToken",option)
  .json(
    new ApiResponse(200, {}, 'logout successfully')
  )


});
export { registerUser, loginUser, logoutUser };
