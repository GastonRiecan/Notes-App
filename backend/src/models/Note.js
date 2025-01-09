import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    date: { type: String, default: Date.now },
});

const Note = model('Note', noteSchema);

export default Note;