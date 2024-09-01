import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import MainImage from "../Sections/MainImage";
import StarRating from "../../../common/StarRating";
import styles from "../../../common/SlideCard.module.css";
import Favorite from "../../../common/Favorite";
import Comment from "../../../common/Comment/Comment";

import axios from 'axios';

export default function MovieDetail({ movieId, onClose, movieImage }) {
  const [Movie, setMovie] = useState(null);
  const [Casts, setCasts] = useState([]);
  const [commentLists, setCommentLists] = useState([])

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast.slice(0, 3));
      });

      // 댓글 정보 가져오기
      axios.post('/api/comment/getComments', movieId)
      .then(response => {
          console.log(response)
          if (response.data.success) {
             setCommentLists(response.data.comments)
          } else {
              alert('댓글을 가져오는데 실패했습니다.')
          }
      })
  }, [movieId]);
  
  // 자식 컴포넌트로부터 댓글 업데이트 받기 
  const refreshFunction = (newComment) => {
    setCommentLists(commentLists.concat(newComment))
}

  if (!Movie) return null;
  let voteAverage = Movie.vote_average.toFixed(1);
  return (
    <Dialog open={true} onClose={onClose} className="relative z-10 text-white">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relsative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-black px-4 pb-4 pt-5">
              <MainImage
                image={`${IMAGE_BASE_URL}original${Movie.backdrop_path}`}
                title={Movie.original_title}
              />
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6"
                  >
                    <div className="flex space-x-2 ">
                      <span className={styles.info}>{Movie.release_date}</span>
                      <span className={styles.info}>{Movie.runtime}m</span>
                      <span className={styles.info}>
                        <div className="flex space-x-2">
                          {Movie.genres &&
                            Movie.genres.map((g, index) => (
                              <p key={g.id}>
                                {g.name}
                                {index < Movie.genres.length - 1 && ","}
                              </p>
                            ))}
                        </div>
                      </span>
                    </div>

                    <br />
                    <StarRating voteAverage={voteAverage} />
                    <br />
                    <Favorite
                      movieInfo={Movie}
                      movieId={movieId}
                      movieImage={movieImage}
                      userFrom={localStorage.getItem("userId")}
                    />
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-lg ">
                      Casts:{" "}
                      {Casts.map((cast, index) => (
                        <span key={index}>
                          {cast.original_name}
                          {index < Casts.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <p className="text-sm">{Movie.overview}</p>
                  </div>
                  <Comment movieId={movieId} commentLists={commentLists} refreshFunction={refreshFunction} />
                </div>
              </div>
            </div>
            <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
