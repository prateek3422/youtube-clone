import { Router } from "express";
import {
  changeCurrentPassword,
  getChannelProfile,
  getCurrentUser,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { veryfyJwt } from "../middleware/verifyJwt.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },

    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(veryfyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(veryfyJwt, changeCurrentPassword);
router.route("/current-user").get(veryfyJwt, getCurrentUser);
router.route("/update-account").patch(veryfyJwt, updateAccountDetails);
router.route("/avatar").patch(veryfyJwt, upload.single("avatar"), updateAvatar);
router
  .route("/coverImage")
  .patch(veryfyJwt, upload.single("coverImage"), updateCoverImage);
router.route("/c/:userName").get(veryfyJwt, getChannelProfile);
router.route("/history").get(veryfyJwt, getWatchHistory)

export default router;
