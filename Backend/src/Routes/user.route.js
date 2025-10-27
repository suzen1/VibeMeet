import express from "express"
import { protectRoute } from "../middleware/auth.middlware.js";
import { getRecommendedUser } from "../controllers/user.controller.js";
import { getMyFriends } from "../controllers/user.controller.js";
const router = express.Router();

router.use(protectRoute);
router.get("/",getRecommendedUser);
router.get("/friends", getMyFriends);



export default router;