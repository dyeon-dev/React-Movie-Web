import React, { useState, useEffect } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import SlideCard from "../TvDetail/SlideCard";
import styles from "../TvDetail/SlideCard.module.css";

export default function NowplayTv({ fetchTv }) {
  const [tvs, setTvs] = useState([]);
  const [MainTvImg, setMainTvImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;
    fetchTv(endpoint, setTvs, setMainTvImg);
  }, [fetchTv]);
  
  const nextSlide = () => {
    if (currentIndex + 8 < tvs.length) {
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
      <p className="my-8 text-4xl font-bold text-white">현재 상영중인 드라마</p>
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className={styles.button}
        >
          ‹
        </button>

        <div className="grid grid-cols-8 gap-3 transition-transform duration-500 ease-out">
          {tvs.slice(currentIndex, currentIndex + 8).map((tv, index) => (
            <SlideCard
              key={index}
              image={
                tv.poster_path
                  ? `${IMAGE_BASE_URL}w500${tv.poster_path}`
                  : null
              }
              tvId={tv.id}
              tvName={tv.original_name}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          disabled={currentIndex + 8 >= tvs.length}
          className={styles.button}
        >
          ›
        </button>
      </div>
    </div>
  );
}
