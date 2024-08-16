import React from "react";
import Header from "../components/common/Header";
import styles from "./Common.module.css";

import TopMovie from "../components/Movies/TopMovie";
import NowplayMovie from "../components/Movies/NowplayMovie";

export default function Tv() {
  return (
    <div>
      <div className={styles.body}>
        <Header />
        <div className="p-6">
          <TopMovie />
          <NowplayMovie />
        </div>
      </div>
    </div>
  );
}
