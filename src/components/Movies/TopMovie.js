import React, { useState, useEffect } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../core/Config";
import SlideCard from "../common/SlideCard";

export default function TopMovie() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      });
  }, []);

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
    <>
      <p className="text-4xl font-bold text-white">인기 영화</p>
      <hr />
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          className="text-white bg-gray-700 p-2 rounded mr-2"
          disabled={currentIndex === 0}
        > 
        ‹
        </button>
        <div className="grid grid-cols-8 gap-3">
          {movies.slice(currentIndex, currentIndex + 8).map((movie, index) => (
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
        <button
          onClick={nextSlide}
          className="text-white bg-gray-700 p-2 rounded ml-2"
          disabled={currentIndex + 8 >= movies.length}
        >
          ›
        </button>
      </div>
    </>
  );
}
