import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const validateMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateMail.test(email))
      return res.status(400).json({ success: false, message: "Invalid email" });

    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });

    const user = await User.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const userName = await User.findOne({ username: username });

    if (userName)
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const ProfilePic = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = ProfilePic[Math.floor(Math.random() * ProfilePic.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User Does Not Exist" });

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
	  message : "Logged In Successfully",
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("Token");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
