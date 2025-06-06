import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); //exit with failure
  }
};
