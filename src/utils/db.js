import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(
      `mongodb+srv://chandhudev0:${process.env.MONGODB_SECRET_KEY}@test.61o7n.mongodb.net/?retryWrites=true&w=majority&appName=test`
    );

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
