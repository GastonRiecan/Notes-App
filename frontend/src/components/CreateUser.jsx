import { useState, useEffect } from "react";
import axios from "axios";

const CreateUser = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  const BACK_URL = "https://notes-app-psi-ashen.vercel.app";

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get(`${BACK_URL}/api/users`);
    setUsers(res.data);
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${BACK_URL}/api/users`, { username });
    setUsername("");
    getUsers();
  };

  const deleteUser = async (id) => {
    console.log("El usuario será eliminado:", id);
    await axios.delete(`${BACK_URL}/api/users/${id}`);
    getUsers();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create New User</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
              onClick={() => deleteUser(user._id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateUser;
