import { Router } from "express";
import {
  createComunity,
  getUserComunity,
  updateComunity,
  deleteComunity,
} from "../controllers/comunity.controller.js";
import { veryfyJwt } from "../middleware/verifyJwt.js";

const router = Router();
router.use(veryfyJwt); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createComunity);
router.route("/user/:userId").get(getUserComunity);
router.route("/:tweetId").patch(updateComunity).delete(deleteComunity);

export default router;
