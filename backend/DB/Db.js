import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const Db = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${Db.connection.host}`);
  } catch (error) {
    console.log("Db is not Connected");
  }
};
export default ConnectDB;
