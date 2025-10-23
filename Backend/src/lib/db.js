import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};
