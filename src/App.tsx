import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme from "./theme/page";
import Editor from "./editor/page";
import ENS from "./ens";

function App() {
  return (
    <Router>
      <nav></nav>
      <Routes>
        <Route path="/" element={<>Hello, from Path one page</>} />
        {/* <Route path="/theme" element={<Theme />} /> */}
        <Route path="/ens" element={<ENS />} />
        {/* <Route path="/editor" element={<Editor />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
