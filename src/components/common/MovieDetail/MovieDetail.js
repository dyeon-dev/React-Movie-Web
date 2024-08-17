import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../core/Config";
import MovieInfo from "./MovieInfo";

export default function MovieDetail() {
  let { movieId } = useParams();
  const [Movie, setMovie] = useState([])
  console.log(movieId)

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response)
      });
  }, []);

  return (
    <div>
        <div style = {{width:'85%', margin: '1rem auto'}}>

          <div style={{ width: '85%', margin: '1rem auto'}}>
            <MovieInfo 
            movie={Movie}/>
          </div>
        </div>
    </div>
  )
}
