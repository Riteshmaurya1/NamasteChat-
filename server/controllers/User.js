import Userdb from "../models/Userdb.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../jwt/generatesToken.js";

/* ----------------------User Registration ---------------------- */
export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // For Checking Is user is already exist or not
    const userExist = await Userdb.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    //  For checking is password is confirm or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }
    //  For checking Email is valid or not
    if (!email) {
      return res.status(400).json({
        message: "Please Enter a valid email!",
        success: false,
      });
    }
    // Hash The Password before storing the DB
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save the new Created User
    let newUser = await Userdb.create({
      name,
      email,
      password: hashedPassword,
    });
    // Return the user with token
    if (newUser) {
      const token = createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        success: true,
        newUser,
        token,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

/* ----------------------User Login ---------------------- */
export const login = async (req, res) => {
  const { email, password } = req.body;
  // 1. Check if email and password were sent
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }
  // 2. Find User by Email
  const user = await Userdb.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Please Create Account First.",
      success: false,
    });
  }
  // 3. Comparing the password with the hashed password
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(400).json({
      message: "Invalid Password",
      success: false,
    });
  }
  const token = createTokenAndSaveCookie(user._id, res);
  res.status(201).json({
    message: `${user.name}logged in successfully`,
    success: true,
    user,
    token,
  });
};

/* ----------------------------Logout --------------------- */
export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

/* ----------------------------Users --------------------- */
export const getUserProfile = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    console.log(loggedInUser);

    const filteredfUser = await Userdb.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json({
      filteredfUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

/* ---------------------------- User Profile --------------------- */
export const Profile = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Fetch the logged-in user's profile
    const user = await Userdb.findById(loggedInUserId).select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: error.message,
    });
  }
};
