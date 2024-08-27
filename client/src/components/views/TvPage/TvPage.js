import React from "react";
import Header from "../../common/Header";
import styles from "../../common/Background.module.css";

import PopularTv from "./Sections/PopularTv";
import NowplayTv from "./Sections/NowplayTv";

import Auth from "../../../hoc/auth"

function TvPage() {
  const fetchTvs = (endpoint, setMovies, setMainMovieImg) => {
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
          <PopularTv fetchTv={fetchTvs} />
          <NowplayTv fetchTv={fetchTvs} />
        </div>
      </div>
    </div>
  );
}

export default Auth(TvPage, true);