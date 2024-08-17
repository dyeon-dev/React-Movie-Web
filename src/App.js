import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RateList from "./routes/RateList";
import Tv from "./routes/Tv";
import Movie from "./routes/Movie";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/ratelists" element={<RateList />} />
        </Routes>
    </Router>
  );
}

export default App;