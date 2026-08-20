import mongoose from "mongoose";

const connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log("MongoDB connection failed: ",  error.message);
        process.exit(1);
    }
};

export default connectDatabase;