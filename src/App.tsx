import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme from "./theme/page";
import Editor from "./editor/page";

function App() {
  return (
    <Router>
      <nav></nav>
      <Routes>
        <Route path="/" element={<>Hello, from Path one page</>} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;
