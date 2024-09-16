import React from "react";
import { useState, useEffect } from "react";
import styles from "../RateListPage/RateList.module.css";
import bg from "../LandingPage/LandingPage.module.css"
import ListItem from "./Sections/ListItem";
import Axios from "axios";
import Auth from "../../../hoc/auth"

function FavoritePage() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    Axios.post("/api/favorite/getFavoriteMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavorites(response.data.favorites);
        setLoading(false);
      } else {
        alert("영화 정보를 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  return (
    <div className={`${bg.body} text-white`}>
      <h1 className="mx-6 text-3xl font-bold">
        내가 좋아요한 리스트 {loading ? "" : `(${favorites.length})`}
      </h1>

      <div className="flex space-x-4">
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {favorites.map((favorite, index) => (
              <ListItem key={index} movie={favorite} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default Auth(FavoritePage, true);