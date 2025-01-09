import Note from "../models/Note.js";

const notesCtrl = {};

notesCtrl.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las notas", error: error.message });
    }
};

notesCtrl.createNote = async (req, res) => {
    try {
        const { title, content, date, author } = req.body;
        const newNote = new Note({ title, content, date, author });
        await newNote.save();
        res.status(201).json({ message: "Nota creada exitosamente", note: newNote });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la nota", error: error.message });
    }
};

notesCtrl.getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Nota no encontrada" });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la nota", error: error.message });
    }
};

notesCtrl.updateNote = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, author },
            { new: true, runValidators: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Nota no encontrada" });
        res.status(200).json({ message: "Nota actualizada exitosamente", note: updatedNote });
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la nota", error: error.message });
    }
};

notesCtrl.deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Nota no encontrada" });
        res.status(200).json({ message: "Nota eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la nota", error: error.message });
    }
};

export { notesCtrl };
