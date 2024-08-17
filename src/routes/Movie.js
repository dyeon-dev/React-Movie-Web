import React from "react";
import Header from "../components/common/Header";
import styles from "./Common.module.css";

import PopularMovie from "../components/Movies/PopularMovie";
import NowplayMovie from "../components/Movies/NowplayMovie";
import UpcomingMovie from "../components/Movies/UpcomingMovie";

export default function Movie() {
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