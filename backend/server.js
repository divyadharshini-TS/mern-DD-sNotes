import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(ratelimiter);

// mount notes router
app.use('/api/notes', notesRouter);



const start = async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('Database connection failed, exiting:', err.message || err);
        process.exit(1);
    }

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

start();