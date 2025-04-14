import mongoose from "mongoose";

const URL = process.env.MONGO_URI;
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection Failed");
  }
};
