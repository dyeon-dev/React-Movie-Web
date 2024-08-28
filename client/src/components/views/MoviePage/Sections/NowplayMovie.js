import React, { useState, useEffect } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import SlideCard from "../MovieDetail/SlideCard";
import styles from "../../../common/SlideCard.module.css";

export default function NowplayMovie({ fetchMovie }) {
  const [movies, setMovies] = useState([]);
  const [MainMovieImg, setMainMovieImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovie(endpoint, setMovies, setMainMovieImg);
  }, [fetchMovie]);
  
  const nextSlide = () => {
    if (currentIndex + 8 < movies.length) {
      setCurrentIndex(currentIndex + 8);
    }
  };

  const prevSlide = () => {
    if (currentIndex - 8 >= 0) {
      setCurrentIndex(currentIndex - 8);
    }
  };

  return (
    <div>
      <p className="my-8 text-4xl font-bold text-white">현재 상영중인 영화</p>
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={styles.button}
        >
          ‹
        </button>

        <div className="grid grid-cols-8 gap-3 transition-transform duration-500 ease-out">
          {movies.slice(currentIndex, currentIndex + 8).map((movie, index) => (
            <SlideCard
              key={index}
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/1479px-Noimage.svg.png'
                }
              movieId={movie.id}
              movieName={movie.original_title}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          disabled={currentIndex + 8 >= movies.length}
          className={styles.button}
        >
          ›
        </button>
      </div>
    </div>
  );
}
