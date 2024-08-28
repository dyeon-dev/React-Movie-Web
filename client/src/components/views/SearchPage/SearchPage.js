import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import styles from "../../common/SlideCard.module.css";
import bg from "../../common/Background.module.css";

import Header from "../../common/Header";
import MovieDetail from "../MoviePage/MovieDetail/MovieDetail";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery();
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleImageClick = (movieId) => {
    setSelectedMovieId(movieId); // 해당 영화의 ID값 저장
  };

  const handleCloseDetail = () => {
    setSelectedMovieId(null); // 선택했던 창 닫으면 다시 초기화
  };

  useEffect(() => {
    const searchQuery = query.get("query");
    if (searchQuery) {
      const endpoint = `${API_URL}search/multi?api_key=${API_KEY}&query=${searchQuery}&include_adult=false&language=en-US&page=1`;
      fetch(endpoint)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.results);
          setMovies(response.results);
        });
    }
  }, []);

  return (
    <div>
      <div className={bg.body}>
        <Header />
        <div className="p-6">
          <p className="my-8 text-xl font-bold text-white">
            "{query.get("query")}"(으)로 검색한 결과입니다.
          </p>
          <div className="grid grid-cols-8 gap-3 transition-transform duration-500 ease-out">
            {movies.map((movie, index) => (
              <div className={styles.card} key={index}>
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/1479px-Noimage.svg.png'
                  }
                  alt={movie.original_title}
                  className={styles.poster}
                  onClick={() => handleImageClick(movie.id)} // Pass the movie ID to the click handler
                />
                {/* Show the MovieDetail component only if the current movie ID matches the selected one */}
                {selectedMovieId === movie.id && (
                  <MovieDetail onClose={handleCloseDetail} movieId={movie.id} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;