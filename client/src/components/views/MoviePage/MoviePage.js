import React from "react";
import Header from "../../common/Header";
import styles from "../../common/Background.module.css";

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
      <div className={styles.body}>
        <Header />
        <div className="p-6">
          <PopularMovie fetchMovie={fetchMovies} />
          <NowplayMovie fetchMovie={fetchMovies} />
          <UpcomingMovie fetchMovie={fetchMovies} />
        </div>
      </div>
    </div>
  );
}

export default Auth(MoviePage, true);