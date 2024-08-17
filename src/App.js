import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RateList from "./routes/RateList";
// import Detail from "./routes/Detail";
import Tv from "./routes/Tv";
import Movie from "./routes/Movie";
import MovieDetail from "./components/common/MovieDetail/MovieDetail";
import Detail from "./components/common/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        {/* <Route path="/movie/:movieId" element={<Detail />} /> */}
        <Route path="/tv" element={<Tv />} />
        <Route path="/ratelists" element={<RateList />} />
        {/* <Route path="/movie/:id" element={<Detail />} /> */}
        </Routes>
    </Router>
  );
}

export default App;