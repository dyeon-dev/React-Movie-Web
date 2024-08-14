import React, { useState, useEffect } from "react";
import styles from "../../routes/Movie.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { actionCreators } from "../../core/Store";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../core/Config";
import MainImage from "./MainImage";
export default function CurrentTv() {
  const [movies, setMovies] = useState([]);
  const [MainMovieImg, setMainMovieImg] = useState(null);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint)
      .then((reponse) => reponse.json())
      .then((response) => {
        console.log(response);

        setMovies([response.results]);
        setMainMovieImg(response.results[0]);
      });
  }, []);
  return (
    <div className={styles.body}>
      <div className="p-4">
        {MainMovieImg && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${MainMovieImg.backdrop_path}`}
            title={MainMovieImg.original_title}
            text={MainMovieImg.overview}
          />
        )}
        <p className="text-4xl font-bold text-white">현재 상영중인 영화</p>
        <div className="grid grid-cols-10 gap-4 p-4">
          
        </div>
      </div>
    </div>
  );
}
