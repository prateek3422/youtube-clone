import { Router } from 'express';
import {
    getChannelStats,
    getChannelVideos,
} from "../controllers/dashbord.controller.js"
import { veryfyJwt } from '../middleware/verifyJwt.js';


const router = Router();

router.use(veryfyJwt); // Apply verifyJWT middleware to all routes in this file

router.route("/stats/").get(getChannelStats);
router.route("/videos").get(getChannelVideos);

export default router