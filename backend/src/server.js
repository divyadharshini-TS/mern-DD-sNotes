import express from "express";
import cors from "cors";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import net from "net";

dotenv.config();
const app = express();
const START_PORT = Number(process.env.PORT) || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json());
app.use(rateLimiter);

// mount notes router
app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
    });
}

const findFreePort = (start) => {
    let port = start;
    return new Promise((resolve, reject) => {
        const tryListen = () => {
            const tester = net.createServer()
                .once("error", (err) => {
                    if (err.code === "EADDRINUSE") {
                        port += 1;
                        setImmediate(tryListen);
                    } else {
                        reject(err);
                    }
                })
                .once("listening", () => {
                    tester.close(() => resolve(port));
                })
                .listen(port);
        };
        tryListen();
    });
};

connectDB().then(async () => {
    try {
        const freePort = await findFreePort(START_PORT);
        app.listen(freePort, () => {
            console.log("Server started on PORT:", freePort);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
});