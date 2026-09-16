import mongoose from "mongoose";

const connectDatabase = async () => {
    const connectionString = process.env.MONGODB_URL?.trim();

    if (!connectionString) {
        throw new Error("MONGODB_URL is missing from the server environment");
    }

    try {
        await mongoose.connect(connectionString, {
            family: 4,
            serverSelectionTimeoutMS: 10000,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);

        if (error.message.includes("querySrv")) {
            console.error(
                "Check that MONGODB_URL uses the current Atlas driver URI and that DNS/network access is available.",
            );
        }

        process.exit(1);
    }
};

export default connectDatabase;