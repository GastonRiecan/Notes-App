import { Router } from "express";
import { notesCtrl } from "../controllers/notes.controller.js";
const notesRouter = Router();

notesRouter.route('/')
	.get(notesCtrl.getNotes)
	.post(notesCtrl.createNote)

notesRouter.route('/:id')
	.get(notesCtrl.getNote)
	.put(notesCtrl.updateNote)
	.delete(notesCtrl.deleteNote)

export default notesRouter