import React from "react";

import PopularMovie from "./Sections/PopularMovie";
import NowplayMovie from "./Sections/NowplayMovie";
import UpcomingMovie from "./Sections/UpcomingMovie";

import Auth from "../../../hoc/auth"

function MoviePage() {
  const fetchMovies = (endpoint, setMovies, setMainMovieImg) => {
    fetch(endpoint)
    .then((response) => response.json())
    .then((response) => {
      // 현재 상영중인 영화, 개봉 예정 영화 데이터
      setMovies(response.results);
      // 가장 인기많은 영화 데이터
        setMainMovieImg(response.results[0]);
      });
  };
  return (
    <div>
      <div className="bg-black text-white">
          <PopularMovie fetchMovie={fetchMovies} />
          <NowplayMovie fetchMovie={fetchMovies} />
          <UpcomingMovie fetchMovie={fetchMovies} />
      </div>
    </div>
  );
}

export default Auth(MoviePage, true);