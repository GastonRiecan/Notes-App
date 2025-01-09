import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/notes");
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:4000/api/notes/${id}`);
    console.log("Note deleted");
    getNotes();
  };

  return (
    <div className="row">
      {notes.map((note) => (
        <div key={note._id} className="col-md-4 p-2">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5>{note.title}</h5>
              <Link className="btn btn-secondary" to={`/edit/${note._id}`}>
                Edit Note
              </Link>
            </div>
            <div className="card-body">
              <p>{note.content}</p>
              <p>{note.author}</p>
              <p>{format(note.date)}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => deleteNote(note._id)}
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
