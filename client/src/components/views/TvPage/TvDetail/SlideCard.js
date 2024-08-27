import React, { useState } from "react";

import styles from "./SlideCard.module.css";
import TvDetail from "./TvDetail";
export default function SlideCard(props) {
  
  const [showDetail, setShowDetail] = useState(false);

  const handleImageClick = () => {
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div className={styles.card}>
        <img
          src={props.image}
          alt={props.tvName}
          className={styles.poster}
          onClick={handleImageClick}
        />
      {showDetail && (
        <TvDetail onClose={handleCloseDetail} tvId={props.tvId}/>
      )}
    </div>
  );
}
