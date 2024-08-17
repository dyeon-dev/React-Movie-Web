import React, { useState } from "react";

import styles from "./SlideCard.module.css";
import Detail from "./Detail";
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
          alt={props.movieName}
          className={styles.poster}
          onClick={handleImageClick}
        />
      {showDetail && (
        <Detail onClose={handleCloseDetail} movieId={props.movieId}/>
      )}
    </div>
  );
}
