import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  updateVideo,
} from "../controllers/video.controller.js";
import { veryfyJwt } from "../middleware/verifyJwt.js";

const router = Router();

router.use(veryfyJwt); // Apply verifyJWT middleware to all routes in this file

router.route("/publish-video").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router
.route("/:videoId")
.get(getAllVideos)
  .get(getVideoById)
  .delete(deleteVideo)
  .patch(upload.single("thumbnail"), updateVideo);

export default router;
