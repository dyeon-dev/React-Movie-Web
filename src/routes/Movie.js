import React from "react";
import Header from "../components/common/Header";
import styles from "./Common.module.css";

import PopularMovie from "../components/Movies/PopularMovie";
import NowplayMovie from "../components/Movies/NowplayMovie";
import UpcomingMovie from "../components/Movies/UpcomingMovie";

export default function Tv() {
  return (
    <div>
      <div className={styles.body}>
        <Header />
        <div className="p-6">
          <PopularMovie />
          <NowplayMovie />
          <UpcomingMovie />
        </div>
      </div>
    </div>
  );
}
