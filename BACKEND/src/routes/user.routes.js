import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import {veryfyJwt} from "../middleware/verifyJwt.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount:1
    },

    {
     name: "coverImage",
    maxCount:1
},
  ]),

  registerUser
);
router.route("/login").post(loginUser)
router.route("/logout").post(veryfyJwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
