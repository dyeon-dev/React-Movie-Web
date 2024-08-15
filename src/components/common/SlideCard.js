import React from "react";
import styles from "./SlideCard.module.css";

export default function SlideCard(props) {
  return (
    <>
      <a href={`/movie/${props.movieId}`}>
        <img
          src={props.image}
          alt={props.movieName}
          className={styles.poster}
        />
      </a>
    </>
  );
}
