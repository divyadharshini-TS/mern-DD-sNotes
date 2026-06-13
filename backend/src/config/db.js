import mongoose from "mongoose";


export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.warn(
            'MONGO_URI not set — skipping MongoDB connection. Set MONGO_URI to enable DB.'
        );
        return; // don't exit; allow server to start for local testing
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};