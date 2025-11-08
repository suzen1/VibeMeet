import { upsertStreamUser } from "../lib/Stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  try {
    const { email, password, Fullname } = req.body;

    // 1️⃣ Validate input
    if (!email || !password || !Fullname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 2️⃣ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists, use another email" });
    }

    // 3️⃣ Generate random avatar
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    // 4️⃣ Create new user
    const newUser = await User.create({
      email,
      password,
      Fullname,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.Fullname,
        email: newUser.email
      });
      console.log(`Stream user created for ${newUser.Fullname}`);
    } catch (error) {
      console.log("error in strem blog", error);
    }

    // 5️⃣ Generate JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 6️⃣ Set cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 7️⃣ Respond
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Simple placeholders for now
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordCorrect = await user.matchPassword(password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  return res.status(200).json({ success: true, message: "successful Logout" });
}

export async function onboarding(req, res) {
  try {
    const userId = req.user._id;


    const { Fullname, bio, nativeLanguage, learningLanguage, location } = req.body;
    if (!Fullname || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !Fullname && "fullname",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location"
        ].filter(Boolean)
      });
    }

    const updateUser = await User.findByIdAndUpdate(userId, {
      Fullname,
      bio,
      location,
      nativeLanguage,
      learningLanguage,
       isOnboarded: true,
    }, { new: true });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    try {
      await upsertStreamUser({
        id: updateUser._id.toString(),
        name: updateUser.Fullname,
        profilePic: updateUser.profilePic
      });
      console.log(`Stream user updated for ${updateUser.Fullname}`);
    } catch (error) {
      console.log("Error updating Stream user:", error);
    }
    return res.status(200).json({
      message: "User updated successfully",
      user: updateUser
    });
  } catch (error) {
    console.error("Onboarding Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
