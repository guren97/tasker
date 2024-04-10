import mongoose from "mongoose";

const connectToDb = async () => {
  const conn_string = process.env.MONGODB_URI;
  try {
    await mongoose.connect(conn_string);
    console.log("Connected to server");
  } catch (error) {
    console.log("Could not connect to server", error.message);
  }
};

export default connectToDb;
