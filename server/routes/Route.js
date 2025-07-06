import express from "express";
import {
  getUserProfile,
  login,
  logout,
  Profile,
  register,
} from "../controllers/User.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

// Create Router for the User Registration
userRouter.post("/register", register);

//  Create Router for the User Login
userRouter.post("/login", login);

//  Create Router for the User Logout
userRouter.post("/logout", logout);

//  Create Router for the User Login
userRouter.get("/getuserprofile", protect, getUserProfile);

//  Create Router for the User Login
userRouter.get("/profile", protect, Profile);

export default userRouter;
