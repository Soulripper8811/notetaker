import express from "express";
import notesRoutes from "./routes/notes.routes.js";
import { connectToDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
dotenv.config();

const __dirname = path.resolve(); //this will provide the backend  path full
const app = express();
const port = process.env.PORT || 5001;

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // phele baackend path se ek uper gaya fir frontend mein gaya fir dist mein for serving as static

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  }); //iska matlab hei backend ke alwa koi bhi route he toh usko frontend treat karo and frontend dikhao
}
connectToDb().then(() =>
  app.listen(port, () => {
    console.log("Server is running on port 5001");
  })
);
