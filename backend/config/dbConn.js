import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
