import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateNote = () => {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getUsers();
    if (id) {
      setEditing(true);
      const getNote = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/notes/${id}`);
          const note = res.data;
          setTitle(note.title);
          setContent(note.content);
          setDate(new Date(note.date));
          setUserSelected(note.author);
        } catch (error) {
          console.error("Error fetching the note:", error);
        }
      };
      getNote();
    }
  }, [id]);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data.map((user) => user.username));
    setUserSelected(res.data[0]?.username || "");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      date,
      author: userSelected,
    };

    try {
      if (editing) {
        await axios.put(`http://localhost:4000/api/notes/${id}`, newNote);
      } else {
        await axios.post("http://localhost:4000/api/notes", newNote);
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error saving the note:", error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>{editing ? "Edit Note" : "Create a Note"}</h4>

        {/* Select User */}
        <div className="form-group">
          <select
            className="form-control"
            name="userSelected"
            value={userSelected}
            onChange={(e) => setUserSelected(e.target.value)}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <Datepicker
            className="form-control"
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </div>

        <form onSubmit={onSubmit}>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
