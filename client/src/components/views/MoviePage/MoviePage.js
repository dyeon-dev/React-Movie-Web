import React from "react";
import Header from "../../common/Header";
import styles from "../../common/Background.module.css";

import PopularMovie from "./Sections/PopularMovie";
import NowplayMovie from "./Sections/NowplayMovie";
import UpcomingMovie from "./Sections/UpcomingMovie";

import Auth from "../../../hoc/auth"

function MoviePage() {
  const fetchMovie = (endpoint, setMovies, setMainMovieImg) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setMainMovieImg(response.results[0]);
      });
  };
  const fetchMovies = (endpoint, setMovies) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      });
  };

  return (
    <div>
      <div className={styles.body}>
        <Header />
        <div className="p-6">
          <PopularMovie fetchMovie={fetchMovie} />
          <NowplayMovie fetchMovies={fetchMovies} />
          <UpcomingMovie fetchMovies={fetchMovies} />
        </div>
      </div>
    </div>
  );
}

export default Auth(MoviePage, true);