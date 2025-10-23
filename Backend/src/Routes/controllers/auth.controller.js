import User from "../../Models/User.js";
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
export function login(req, res) {
  res.send("This is login route");
}

export function logout(req, res) {
  res.send("This is logout route");
}
