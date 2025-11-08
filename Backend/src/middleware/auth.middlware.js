import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - token not hear" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ message: "Invalide token" });
        }
        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }
        req.user = user;
        next()
    }catch (error) {
      res.status(401).json({ message: "Not authorized" });
  }
}
