import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Theme from "./theme/page";
import Editor from "./editor/page";
import ENS from "./ens";
import Home from "./home";
import OnBoard from "./onboard";
import Dashboard from "./dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboard" element={<OnBoard />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/ens" element={<ENS />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
