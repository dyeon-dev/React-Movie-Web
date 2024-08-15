import React, { useState, useEffect, useRef } from "react";
import styles from "../../routes/Movie.module.css";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../core/Config";
import MainImage from "./MainImage";
import SlideCard from "../common/SlideCard";

export default function CurrentTv() {
  const [movies, setMovies] = useState([]);
  const [MainMovieImg, setMainMovieImg] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies(response.results);
        setMainMovieImg(response.results[0]);
      });
  }, []);

  const handleSlideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth; // Move right by the width of the visible container
    }
  };

  const handleSlideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth; // Move left by the width of the visible container
    }
  };

  return (
      <div>
        {MainMovieImg && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovieImg.backdrop_path}`}
            title={MainMovieImg.original_title}
            text={MainMovieImg.overview}
          />
        )}
        <p className="text-4xl font-bold text-white">현재 상영중인 영화</p>
        <hr />

        <div className={styles.sliderWrapper}>
          <button className={`${styles.slideButton} left`} onClick={handleSlideLeft}>‹</button>
          <div className={styles.sliderContainer} ref={sliderRef}>
            {movies &&
              movies.map((movie, index) => (
                <SlideCard
                  key={index}
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              ))}
          </div>
          <button className={`${styles.slideButton} right`} onClick={handleSlideRight}>›</button>
        </div>
      </div>
  
  );
}
