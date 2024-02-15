import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js"
import { veryfyJwt } from '../middleware/verifyJwt.js';


const router = Router();
router.use(veryfyJwt); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .get( getUserChannelSubscribers)
    .post(toggleSubscription);

router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router