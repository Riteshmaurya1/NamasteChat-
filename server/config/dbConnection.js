import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "Users",
    })
    .then(() => {
      console.log(`Connected to MongoDB ✔`);
    })
    .catch((err) => {
      console.log(`Error connecting to MongoDB ❌`, err);
    });
};
export default dbConnection;
