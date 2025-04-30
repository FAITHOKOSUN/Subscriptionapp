import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../env.js";


if(!DB_URI) {
  throw new Error("DB_URI is not defined, please check your .env file");
}
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected: ${NODE_ENV} environment`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
    }

    export default connectDB;