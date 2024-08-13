import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RateList from "./routes/RateList";
import Detail from "./routes/Detail";
import Tv from "./routes/Tv";
import Movie from "./routes/Movie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/ratelists" element={<RateList />} />
        <Route path="/movie/:id" element={<Detail />} />
        </Routes>
    </Router>
  );
}

export default App;