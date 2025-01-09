import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation.jsx";
import NoteList from "./components/NotesList.jsx";
import CreateNote from "./components/CreateNote.jsx";
import CreateUser from "./components/CreateUser.jsx";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
          <div className="container p-4">
            <Routes>
              <Route path="/" element={<NoteList />} />
              <Route path="/edit/:id" element={<CreateNote />} />
              <Route path="/create" element={<CreateNote />} />
              <Route path="/user" element={<CreateUser />} />
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
