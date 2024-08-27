import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import RateListPage from "./views/RateListPage/RateListPage";

import MoviePage from "./views/MoviePage/MoviePage";
import LoginPage from "./views/LoginPage/LoginPage";
import TvPage from './views/TvPage/TvPage'
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from '../hoc/auth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/ratelists" element={<RateListPage />} />
        </Routes>
    </Router>
  );
}

export default App;