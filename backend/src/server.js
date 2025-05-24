import express from "express";
import notesRoutes from "./routes/notes.routes.js";
import { connectToDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
app.get("/api/notes", (req, res) => {
  res.send("Hello World");
});

connectToDb().then(() =>
  app.listen(port, () => {
    console.log("Server is running on port 5001");
  })
);
