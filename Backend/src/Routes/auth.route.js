
import express from 'express';
const router = express.Router();
import { singup, login, logout, onboarding } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middlware.js';

router.post("/singup", singup);

router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectRoute, onboarding);

router.get("/me", protectRoute, (req, res) => {
    return res.status(401).json({ success: true, user: req.user });
})


export default router;