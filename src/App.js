import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RateList from "./routes/RateList";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ratelists" element={<RateList />} />
        <Route path="/movie/:id" element={<Detail />} />
        </Routes>
    </Router>
  );
}

export default App;