import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import RateListPage from "./views/RateListPage/RateListPage";

import MoviePage from "./views/MoviePage/MoviePage";
import LoginPage from "./views/LoginPage/LoginPage";
import TvPage from "./views/TvPage/TvPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import SearchPage from "./views/SearchPage/SearchPage";
import FavoritePage from "./views/FavoritePage/FavoritePage";
import NavBar from "./views/Navbar/NavBar";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <NavBarWrapper />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/ratelists" element={<RateListPage />} />
        </Routes>
      </Router>
    </Suspense>
  );
}
function NavBarWrapper() {
  const location = useLocation();
  if (location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register") {
    return <NavBar />;
  }
  return null;
}

export default App;
