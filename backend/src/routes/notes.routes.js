import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controller/notes.controller.js";
const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);

router.get("/:id", getNoteById);
router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
