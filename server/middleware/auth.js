import jwt from "jsonwebtoken";
import User from "../models/Userdb.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request for downstream use
    req.user = user;

    // Continue to next middleware or route
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};
