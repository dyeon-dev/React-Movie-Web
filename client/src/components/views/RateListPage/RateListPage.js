import React from "react";
import { useState, useEffect } from "react";
import styles from "./RateList.module.css";
import List from "./Sections/List";
import ListItem from "./Sections/ListItem";

export default function RateListPage() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  return (
    <>
      <h1 className="mx-6 text-3xl font-bold">
        평점 8.8 이상의 명작들! {loading ? "" : `(${movies.length})`}
      </h1>

      <div class="flex space-x-4">
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <List>
            {movies.map((movie) => (
              <ListItem key={movie.id} movie={movie} />
            ))}
          </List>
        )}
      </div>
    </>
  );
}
