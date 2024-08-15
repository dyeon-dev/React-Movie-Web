import React from "react";
import Header from "../components/common/Header";

import CurrentMovie from "../components/Movies/CurrentMovie";
import TopMovie from "../components/Movies/TopMovie";
import styles from "./Movie.module.css";

export default function Tv() {
  return (
    <div>
      <div className={styles.body}>
        <Header />
        <div className="p-4">
          <CurrentMovie />
          <TopMovie />
        </div>
      </div>
    </div>
  );
}
